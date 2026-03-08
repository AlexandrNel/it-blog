import slugify from "slugify";
import type { UpdatePostRequestDto } from "~/dto/post-request.dto.js";
import type { ParsedCreatePostDto } from "~/dto/post.dto.js";
import type { Tag } from "~/generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "~/generated/prisma/internal/prismaNamespace.js";
import { ApiError } from "~/shared/lib/api-error.js";
import { prisma } from "~/shared/lib/prisma.js";

// ─── Shared query options ───────────────────────────────────────────────────

const includeTags = { select: { tag: { select: { id: true, name: true, key: true } } } } as const;
const includeAuthor = { select: { id: true, name: true, email: true, avatar: true } } as const;
const includeCategory = { select: { id: true, value: true, key: true } } as const

const includeVotes = { select: { user_id: true, value: true } } as const;
const includeCommentsCount = { select: { id: true } } as const;
const includeComments = true as const;

const postPreviewInclude = {
    author: includeAuthor,
    tags: includeTags,
    postVotes: includeVotes,
    comments: includeCommentsCount,
    category: includeCategory
} as const

const fullPostInclude = {
    author: includeAuthor,
    tags: includeTags,
    category: includeCategory
} as const


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

function mapPostToPreview<T extends { tags: { tag: Tag }[]; postVotes: unknown[]; comments: unknown[]; views: number }>(
    p: T
) {
    const { postVotes, comments, tags, ...rest } = p
    return {
        ...rest,
        tags: normalizeTags(p.tags),
        statistic: computeStatistic(p as PostWithVotesAndComments),
    };
}

function mapPostToFull<T extends { tags: { tag: Tag }[] }>(
    p: T
) {
    const { tags, ...rest } = p
    return {
        ...rest,
        tags: normalizeTags(p.tags),
    };
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

// ─── Service ─────────────────────────────────────────────────────────────────

export class PostService {
    async getAll() {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            omit: { content: true },
            include: postPreviewInclude,
        });
        return posts.map(mapPostToPreview);
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
                    include: postPreviewInclude,
                }),
            ]);
            const totalPages = Math.ceil(count / limit);
            return {
                data: data.map(mapPostToPreview),
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
            include: fullPostInclude,
        });
        if (!post) throw ApiError.NotFoundError("Статья не найдена")
        return { ...post, tags: normalizeTags(post.tags) };
    }

    async getAllByTag(tag: string) {
        const posts = await prisma.post.findMany({
            where: { tags: { some: { tag: { key: tag } } } },
            include: postPreviewInclude,
        });
        return posts.map(mapPostToPreview);
    }

    async create(data: ParsedCreatePostDto) {
        return withUniqueSlug(data.slug, async (slug) => {
            return prisma.$transaction(async (tx) => {
                const post = await tx.post.create({
                    data: {
                        categoryId: data.categoryId,
                        desc: data.desc,
                        content: data.content,
                        previewContent: data.previewContent,
                        previewImageUrl: data.previewImageUrl,
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

    async delete(id: string, userId: string) {
        const post = await prisma.post.findUnique({ where: { id, authorId: userId } });
        if (!post) throw ApiError.NotFoundError("К сожалению, мы не смогли найти такую статью");
        return prisma.post.delete({ where: { id, authorId: userId } });
    }

    async update(data: UpdatePostRequestDto, postId: string, userId: string) {
        const { tagIds, title, ...others } = data
        const post = await prisma.post.findUnique({ where: { id: postId, authorId: userId }, select: { id: true, slug: true, title: true, tags: true } })
        if (!post) throw ApiError.NotFoundError("К сожалению, мы не смогли найти такую статью")

        return prisma.$transaction(async (tx) => {
            const isChangedTitle = title && title.trim().toLowerCase() !== post.title.trim().toLowerCase()

            if (!isChangedTitle) {
                await tx.post.update({
                    where: { id: postId },
                    data: {
                        ...others,
                    },
                })
            } else {
                const baseSlug = slugify.default(title, { lower: true, strict: true })
                await withUniqueSlug(baseSlug, (slug) => {
                    return tx.post.update({
                        where: { id: postId },
                        data: {
                            slug,
                            title,
                            ...others
                        },
                    })
                })
            }

            if (tagIds && data.tagIds) {
                const existingTagIds = post.tags.map((t) => t.tagId)
                const newIds = data.tagIds
                const toAdd = newIds.filter(id => !existingTagIds.includes(id))
                const toRemove = existingTagIds.filter(id => !newIds.includes(id))
                if (toAdd.length) {
                    await tx.postTag.createMany({
                        data: toAdd.map(tagId => ({ postId, tagId }))
                    })
                }

                if (toRemove.length) {
                    await tx.postTag.deleteMany({
                        where: { postId, tagId: { in: toRemove } }
                    })
                }

            }

            return tx.post.findUnique({ where: { id: postId }, include: { author: includeAuthor, tags: includeTags } })
        })
    }
    async likeOrDislike(userId: string, postId: string, value: typeof VOTE_LIKE | typeof VOTE_DISLIKE) {
        return prisma.$transaction(async (tx) => {
            const existing = await tx.postVote.findUnique({
                where: { user_id_post_id: { user_id: userId, post_id: postId } },
            });
            if (existing) {
                throw ApiError.BadRequest(
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
            select: { views: true, comments: includeCommentsCount, postVotes: includeVotes },
        });
        if (!stats) throw ApiError.NotFoundError();
        const base = computeStatistic(stats);
        const userVote = userId ? stats.postVotes.find((v) => v.user_id === userId)?.value ?? null : null;
        return {
            ...base,
            votes: { ...base.votes, userVote },
        };
    }
    async updateViews(id: string) {
        return prisma.post.update({ where: { id }, data: { views: { increment: 1 } } });
    }
}


/** @deprecated Use CreatePostRequestDto from ~/dto/post.dto.js */
export type CreatePostDataType = ParsedCreatePostDto;

