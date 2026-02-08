import slugify from "slugify";
import type { Tag } from "~/generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "~/generated/prisma/internal/prismaNamespace.js";
import { NotFoundError } from "~/lib/errors/index.js";
import { prisma } from "~/lib/prisma.js";

const includeTag = { select: { tag: { select: { id: true, name: true } } } }
const includeAuthor = { select: { id: true, name: true, email: true, avatar: true } }

export class PostService {

    async getAll() {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            omit: { content: true },
            include: {
                author: includeAuthor,
                tags: includeTag,
                postVotes: {
                    select: { user_id: true, value: true }
                },
                comments: { select: { id: true } }
            }
        })
        return posts.map((p) => ({
            ...p, statistic: {
                votes: {
                    likes: p.postVotes.filter((v) => v.value > 0).length,
                    dislikes: p.postVotes.filter((v) => v.value < 0).length,
                },
                comments: p.comments.length
            }
        }))
    }
    async getAllWithPages(limit: number = 10, page: number = 1) {
        if (limit === Infinity) return this.getAll()
        const posts = await prisma.$transaction(async (tx) => {
            const count = await tx.post.count()
            const offset = (page - 1) * limit
            const total = Math.ceil(count / limit)
            const data = await tx.post.findMany({
                take: limit,
                skip: offset,
                orderBy: { createdAt: "desc" },
                omit: { content: true },
                include: {
                    author: includeAuthor,
                    tags: includeTag,
                    postVotes: {
                        select: { user_id: true, value: true }
                    },
                    comments: { select: { id: true } }
                }
            })
            return {
                data: data.map((p) => ({
                    ...p, statistic: {
                        votes: {
                            likes: p.postVotes.filter((v) => v.value > 0).length,
                            dislikes: p.postVotes.filter((v) => v.value < 0).length,
                        },
                        comments: p.comments.length
                    }
                })), pages: total
            }
        })
        return posts
    }
    async getById(id: string) {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: includeAuthor,
                tags: includeTag
            }
        })
        return post
    }
    async getBySlug(slug: string) {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                author: includeAuthor,
                tags: includeTag
            }
        })
        return post
    }
    async getAllByTag(tag: string) {
        const posts = await prisma.post.findMany({
            where: { tags: { some: { tag: { name: tag } } } },
            include: {
                author: { omit: { password: true } },
                tags: includeTag,
            }
        })
        return posts
    }
    async create(data: CreatePostDataType) {
        return withUniqueSlug(data.slug, async (slug) => {
            const result = await prisma.$transaction(async (tx) => {
                const post = await tx.post.create({
                    data:
                    {
                        desc: data.desc,
                        content: data.content,
                        slug,
                        title: data.title,
                        authorId: data.authorId
                    }
                })
                let tags: Tag[] = []
                for (const tagName of data.tags) {
                    const tag = await tx.tag.upsert({
                        where: { name: tagName },
                        create: { name: tagName },
                        update: {}
                    })
                    tags.push(tag)
                }

                await tx.postTag.createMany({ data: tags.map((tag) => ({ postId: post.id, tagId: tag.id })) })
                return post
            })
            return result
        })
    }
    async delete(id: string) {
        const post = await prisma.post.findUnique({ where: { id } })
        if (!post) throw new NotFoundError("Статья с таким id не существует")
        return await prisma.post.delete({ where: { id } })
    }

    async update(data: UpdatePostDataType) {
        const { authorId, postId, tags, title, ...others } = data
        const post = await prisma.post.findUnique({ where: { id: postId }, select: { id: true, slug: true, title: true } })
        if (!post) throw new NotFoundError("Такой статьи не существует")

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

            /**
             * ! РАЗОБРАТЬ ЭТУ ЧАСТЬ КОДА
             * ! РЕФАКТОРИНГ, вынести повторяющуюся логику в отдельную функцию
             */
            if (tags) {
                const existingTags = await tx.postTag.findMany({
                    where: { postId },
                    include: { tag: true }
                })
                const incomingTagNames = tags.map(t => t.trim().toLowerCase())
                const persistedTags = await Promise.all(
                    incomingTagNames.map(name =>
                        tx.tag.upsert({
                            where: { name },
                            create: { name },
                            update: {}
                        })
                    )
                )
                const existingTagIds = existingTags.map(pt => pt.tagId)
                const newTagIds = persistedTags.map(t => t.id)

                const toAdd = newTagIds.filter(id => !existingTagIds.includes(id))
                const toRemove = existingTagIds.filter(id => !newTagIds.includes(id))
                if (toAdd.length) {
                    await tx.postTag.createMany({
                        data: toAdd.map(tagId => ({ postId, tagId }))
                    })
                }

                if (toRemove.length) {
                    await tx.postTag.deleteMany({
                        where: {
                            postId,
                            tagId: { in: toRemove }
                        }
                    })
                }
            }

            return tx.post.findUnique({ where: { id: postId }, include: { author: includeAuthor, tags: includeTag } })
        })
    }
}

async function withUniqueSlug<T>(
    baseSlug: string,
    action: (slug: string) => Promise<T>,
    maxTries = 3
): Promise<T> {
    for (let attempt = 0; attempt < maxTries; attempt++) {
        const slug =
            attempt === 0
                ? baseSlug
                : `${baseSlug}-${crypto.randomUUID().slice(0, 4)}`

        try {
            return await action(slug)
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                continue
            }
            throw error
        }
    }

    throw new Error("Не удалось сгенерировать уникальный slug")
}


export type CreatePostDataType = { title: string, content: string, tags: string[], slug: string, authorId: string, desc: string }
export type UpdatePostDataType = Partial<Omit<CreatePostDataType, "slug">> & { authorId: string, postId: string }