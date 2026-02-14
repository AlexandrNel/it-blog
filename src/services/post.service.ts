import type { ParsedCreatePostDto } from "~/dto/post.dto.js";
import { PrismaClientKnownRequestError } from "~/generated/prisma/internal/prismaNamespace.js";
import { NotFoundError, ValidationError } from "~/lib/errors/index.js";
import { prisma } from "~/lib/prisma.js";

// ─── Shared query options ───────────────────────────────────────────────────

const includeTag = { select: { tag: { select: { id: true, name: true, key: true } } } } as const;
const includeAuthor = { select: { id: true, name: true, email: true, avatar: true } } as const;

const postVotesSelect = { select: { user_id: true, value: true } } as const;
const commentsCountSelect = { select: { id: true } } as const;

const postListInclude = {
    author: includeAuthor,
    tags: includeTag,
    postVotes: postVotesSelect,
    comments: commentsCountSelect,
} as const;

const postDetailInclude = {
    author: includeAuthor,
    tags: includeTag,
} as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const VOTE_LIKE = 1;
const VOTE_DISLIKE = -1;

function normalizeTags<T>(tags: { tag: T }[]): T[] {
    return tags.map((t) => t.tag);
}

type PostWithVotesAndComments = {
    postVotes: { user_id: string; value: number }[];
    comments: { id: string }[];
    views: number;
};

function computeStatistic(post: PostWithVotesAndComments) {
    return {
        votes: {
            likes: post.postVotes.filter((v) => v.value > 0).length,
            dislikes: post.postVotes.filter((v) => v.value < 0).length,
        },
        views: post.views,
        comments: post.comments.length,
    };
}

function mapPostToListItem<T extends { tags: { tag: unknown }[]; postVotes: unknown[]; comments: unknown[]; views: number }>(
    p: T
) {
    return {
        ...p,
        tags: normalizeTags(p.tags),
        statistic: computeStatistic(p as PostWithVotesAndComments),
    };
}

const listIncludeWithCategory = {
    ...postListInclude,
    category: { select: { id: true, value: true } },
} as const;

// ─── Service ─────────────────────────────────────────────────────────────────

export class PostService {
    async getAll() {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            omit: { content: true },
            include: listIncludeWithCategory,
        });
        return posts.map((p) => ({
            ...p,
            tags: normalizeTags(p.tags),
            statistic: computeStatistic(p),
        }));
    }

    async getAllWithPages(limit: number = 10, page: number = 1) {
        if (limit === Infinity) return this.getAll();
        return prisma.$transaction(async (tx) => {
            const [count, data] = await Promise.all([
                tx.post.count(),
                tx.post.findMany({
                    take: limit,
                    skip: (page - 1) * limit,
                    orderBy: { createdAt: "desc" },
                    omit: { content: true },
                    include: postListInclude,
                }),
            ]);
            const totalPages = Math.ceil(count / limit);
            return {
                data: data.map(mapPostToListItem),
                pages: totalPages,
            };
        });
    }

    async getById(id: string) {
        return this.getOne({ id });
    }

    async getBySlug(slug: string) {
        return this.getOne({ slug });
    }

    private async getOne(where: { id?: string; slug?: string }) {
        const post = await prisma.post.findUnique({
            where: where as { id: string } | { slug: string },
            include: postDetailInclude,
        });
        if (!post) return null;
        return { ...post, tags: normalizeTags(post.tags) };
    }

    async getAllByTag(tag: string) {
        const posts = await prisma.post.findMany({
            where: { tags: { some: { tag: { name: tag } } } },
            include: {
                author: { omit: { password: true } },
                tags: includeTag,
            },
        });
        return posts.map((p) => ({ ...p, tags: normalizeTags(p.tags) }));
    }

    async create(data: ParsedCreatePostDto) {
        return withUniqueSlug(data.slug, async (slug) => {
            return prisma.$transaction(async (tx) => {
                const post = await tx.post.create({
                    data: {
                        categoryId: data.categoryId,
                        desc: data.desc,
                        content: data.content,
                        slug,
                        title: data.title,
                        authorId: data.authorId,
                    },
                });
                await tx.postTag.createMany({
                    data: data.tagIds.map((tagId) => ({ postId: post.id, tagId })),
                });
                return post;
            });
        });
    }

    async delete(id: string) {
        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) throw new NotFoundError("Статья с таким id не существует");
        return prisma.post.delete({ where: { id } });
    }

    // async update(data: UpdatePostDataType) {
    //     const { authorId, postId, tagIds, title, ...others } = data
    //     const post = await prisma.post.findUnique({ where: { id: postId }, select: { id: true, slug: true, title: true } })
    //     if (!post) throw new NotFoundError("Такой статьи не существует")

    //     return prisma.$transaction(async (tx) => {
    //         const isChangedTitle = title && title.trim().toLowerCase() !== post.title.trim().toLowerCase()

    //         if (!isChangedTitle) {
    //             await tx.post.update({
    //                 where: { id: postId },
    //                 data: {
    //                     ...others,
    //                 },
    //             })
    //         } else {
    //             const baseSlug = slugify.default(title, { lower: true, strict: true })
    //             await withUniqueSlug(baseSlug, (slug) => {
    //                 return tx.post.update({
    //                     where: { id: postId },
    //                     data: {
    //                         slug,
    //                         title,
    //                         ...others
    //                     },
    //                 })
    //             })
    //         }

    //         /**
    //          * ! РАЗОБРАТЬ ЭТУ ЧАСТЬ КОДА
    //          * ! РЕФАКТОРИНГ, вынести повторяющуюся логику в отдельную функцию
    //          */
    //         if (tagIds) {
    //             const existingTags = await tx.postTag.findMany({
    //                 where: { postId },
    //                 include: { tag: true }
    //             })
    //             const incomingTagNames = tags.map(t => t.trim().toLowerCase())
    //             const persistedTags = await Promise.all(
    //                 incomingTagNames.map(name =>
    //                     tx.tag.upsert({
    //                         where: { name },
    //                         create: { name },
    //                         update: {}
    //                     })
    //                 )
    //             )
    //             const existingTagIds = existingTags.map(pt => pt.tagId)
    //             const newTagIds = persistedTags.map(t => t.id)

    //             const toAdd = newTagIds.filter(id => !existingTagIds.includes(id))
    //             const toRemove = existingTagIds.filter(id => !newTagIds.includes(id))
    //             if (toAdd.length) {
    //                 await tx.postTag.createMany({
    //                     data: toAdd.map(tagId => ({ postId, tagId }))
    //                 })
    //             }

    //             if (toRemove.length) {
    //                 await tx.postTag.deleteMany({
    //                     where: {
    //                         postId,
    //                         tagId: { in: toRemove }
    //                     }
    //                 })
    //             }
    //         }

    //         return tx.post.findUnique({ where: { id: postId }, include: { author: includeAuthor, tags: includeTag } })
    //     })
    // }
    async likeOrDislike(userId: string, postId: string, value: typeof VOTE_LIKE | typeof VOTE_DISLIKE) {
        return prisma.$transaction(async (tx) => {
            const existing = await tx.postVote.findUnique({
                where: { user_id_post_id: { user_id: userId, post_id: postId } },
            });
            if (existing) {
                throw new ValidationError(
                    `Вы уже поставили ${existing.value === VOTE_LIKE ? "лайк" : "дизлайк"}`
                );
            }
            return tx.postVote.create({
                data: { value, user_id: userId, post_id: postId },
            });
        });
    }
    async getStatistic(id: string, userId?: string) {
        const stats = await prisma.post.findUnique({
            where: { id },
            select: { views: true, comments: commentsCountSelect, postVotes: postVotesSelect },
        });
        if (!stats) return null;
        return {
            views: stats.views,
            comments: stats.comments.length,
            votes: {
                likes: stats.postVotes.filter((v) => v.value === VOTE_LIKE).length,
                dislikes: stats.postVotes.filter((v) => v.value === VOTE_DISLIKE).length,
                userVote: userId ? stats.postVotes.find((v) => v.user_id === userId)?.value ?? null : null,
            },
        };
    }
    async updateViews(id: string) {
        return prisma.post.update({ where: { id }, data: { views: { increment: 1 } } });
    }
}

async function withUniqueSlug<T>(
    baseSlug: string,
    action: (slug: string) => Promise<T>,
    maxTries = 3
): Promise<T> {
    for (let attempt = 0; attempt < maxTries; attempt++) {
        const slug = attempt === 0 ? baseSlug : `${baseSlug}-${crypto.randomUUID().slice(0, 4)}`;
        try {
            return await action(slug);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                continue;
            }
            throw error;
        }
    }
    throw new Error("Не удалось сгенерировать уникальный slug");
}

/** @deprecated Use CreatePostRequestDto from ~/dto/post.dto.js */
export type CreatePostDataType = ParsedCreatePostDto;

export type UpdatePostDataType = Partial<Omit<ParsedCreatePostDto, "slug" | "categoryId">> & {
    authorId: string;
    postId: string;
};