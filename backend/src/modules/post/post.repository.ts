import { withClient } from '@/shared/helpers/with-db-client.js'
import { fullInclude, previewInclude } from './lib/post.selector.js'
import { prisma } from '@/shared/lib/prisma.js'
import type {
  PostSortParams,
  SearchPostsParams,
  UpdatePostRequestDto,
} from './lib/post.validation.js'
import { withUniqueSlug } from './helpers/with-unique-slug.js'
import type { PostOrderByWithRelationInput } from '@/generated/prisma/models.js'
import { getDateFilter } from './helpers/get-date-filter.js'

export class PostRepository {
  search = async ({
    q,
    page = 1,
    limit = 10,
    sortBy = 'new',
    date = 'all',
    title,
  }: {
    title?: number | null
    date: SearchPostsParams['date']
    q: string
    page: number
    limit?: number
    sortBy?: PostSortParams
  }) => {
    let sort: PostOrderByWithRelationInput = { createdAt: 'desc' }
    if (sortBy === 'popular') sort = { views: 'desc' }
    if (sortBy === 'top') sort = { postVotes: { _count: 'desc' } }
    const orConditions = [
      ...(title
        ? [{ title: { contains: q, mode: 'insensitive' as const } }]
        : []),
      { desc: { contains: q, mode: 'insensitive' as const } },
      { content: { contains: q, mode: 'insensitive' as const } },
      {
        tags: {
          some: {
            tag: { name: { contains: q, mode: 'insensitive' as const } },
          },
        },
      },
    ]
    const posts = await prisma.post.findMany({
      where: {
        OR: orConditions,
        ...(date !== 'all' ? { createdAt: getDateFilter(date) } : {}),
      },
      include: previewInclude,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: sort,
    })

    const totalPages = Math.ceil(posts.length / limit)

    return {
      posts,
      nextPage: page < totalPages ? page + 1 : null,
    }
  }

  findById = withClient(async (client, id: string) => {
    return client.post.findUnique({ where: { id }, include: fullInclude })
  })
  findBySlug = withClient(async (client, slug: string) => {
    return client.post.findUnique({ where: { slug }, include: fullInclude })
  })
  findByUserAndId = withClient(
    async (client, args: { userId: string; postId: string }) => {
      return client.post.findUnique({
        where: { authorId: args.userId, id: args.postId },
        include: fullInclude,
      })
    }
  )
  findMany = withClient(
    async (
      client,
      where?: {
        id?: string
        authorId?: string
        tag?: string
        username?: string
      }
    ) => {
      const merge = where?.tag
        ? { tags: { some: { tag: { key: where.tag } } } }
        : where?.username
          ? { author: { username: where.username } }
          : where
      return client.post.findMany({
        where: { ...merge, published: true },
        orderBy: { createdAt: 'desc' },
        include: previewInclude,
      })
    }
  )
  findManyWithPaginate = async (
    limit: number,
    page: number,
    sortBy: PostSortParams
  ) => {
    return prisma.$transaction(async (tx) => {
      let sort: PostOrderByWithRelationInput = { createdAt: 'desc' }
      if (sortBy === 'popular') sort = { views: 'desc' }
      if (sortBy === 'top') sort = { postVotes: { _count: 'desc' } }

      const count = await tx.post.count()
      const posts = await tx.post.findMany({
        where: { published: true },
        include: previewInclude,
        orderBy: sort,
        take: limit,
        skip: (page - 1) * limit,
      })
      return { count, posts }
    })
  }

  update = async (data: {
    dataToUpdate: UpdatePostRequestDto & { slug?: string }
    postId: string
    tagsToAdd: string[]
    tagsToRemove: string[]
  }) => {
    const {
      dataToUpdate: { slug, categoryId, tagIds, previewImage, ...rest },
      postId,
      tagsToAdd,
      tagsToRemove,
    } = data

    // TODO: вынести withUniqueSlug
    return prisma.$transaction(async (tx) => {
      await withUniqueSlug(slug as any, async (newSlug) => {
        await tx.post.update({
          where: { id: data.postId },
          data: {
            slug: newSlug,
            category: { connect: { id: categoryId } },
            ...(previewImage ? {previewImageUrl: previewImage.url, previewImagePosition: previewImage.position}:{ previewImageUrl: null, previewImagePosition: {x: 0, y: 0}}),
            ...rest,
          },
        })
      })
      await tx.postTag.createMany({
        data: tagsToAdd.map((tagId) => ({ postId, tagId })),
      })
      await tx.postTag.deleteMany({
        where: { postId, tagId: { in: tagsToRemove } },
      })

      return tx.post.findUnique({
        where: { id: postId },
        include: fullInclude,
      })
    })
  }
}
