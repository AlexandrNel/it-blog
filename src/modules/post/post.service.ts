import slugify from 'slugify'
import type {
  UpdatePostRequestDto,
  ParsedCreatePostDto,
  PostSortParams,
  SearchPostsParams,
} from './lib/post.validation.js'
import { ApiError } from '@/shared/lib/api-error.js'
import { prisma } from '@/shared/lib/prisma.js'
import { toFull, toPreview, toStatistic } from './lib/post.transformer.js'
import { withUniqueSlug } from './helpers/with-unique-slug.js'
import { PostRepository } from './post.repository.js'
import { isIdOrUsername } from '@/shared/helpers/username-or-id.js'

// ─── Service ─────────────────────────────────────────────────────────────────

export class PostService {
  constructor(private repo: PostRepository) {}

  async search({
    q,
    page,
    limit,
    sort,
    date,
    title,
  }: SearchPostsParams & { q: string }) {
    const data = await this.repo.search({
      q,
      page,
      limit,
      title,
      date,
      sortBy: sort,
    })
    return { nextPage: data.nextPage, posts: data.posts.map(toPreview) }
  }

  async getAll() {
    const posts = await this.repo.findMany()
    return posts.map(toPreview)
  }

  async getAllWithPages(
    limit: number = 10,
    page: number = 1,
    sortBy: PostSortParams = 'new'
  ) {
    if (limit === Infinity) return this.getAll()
    const { count, posts } = await this.repo.findManyWithPaginate(
      limit,
      page,
      sortBy
    )
    const totalPages = Math.ceil(count / limit)
    return {
      data: posts.map(toPreview),
      pages: totalPages,
    }
  }

  async getById(id: string) {
    return this.getOne({ id })
  }

  async getBySlug(slug: string) {
    return this.getOne({ slug })
  }

  private async getOne(where: { id: string } | { slug: string }) {
    let post
    if ('id' in where) {
      post = await this.repo.findById(undefined, where.id)
    } else {
      post = await this.repo.findBySlug(undefined, where.slug)
    }
    if (!post) throw ApiError.NotFoundError('Статья не найдена')
    return toFull(post)
  }

  async getAllByUserId(authorId: string) {
    const type = isIdOrUsername(authorId)
    const posts = await this.repo.findMany(undefined, { [type]: authorId })
    return posts.map(toPreview)
  }

  async getAllByTag(tag: string) {
    const posts = await this.repo.findMany(undefined, { tag })
    return posts.map(toPreview)
  }

  async create(data: ParsedCreatePostDto) {
    const { tagIds, ...rest } = data
    return withUniqueSlug(data.slug, async (slug) => {
      return prisma.$transaction(async (tx) => {
        // TODO: убрать published, когда будет модерация
        const post = await tx.post.create({
          data: { ...rest, slug, published: true },
        })
        await tx.postTag.createMany({
          data: data.tagIds.map((tagId) => ({
            postId: post.id,
            tagId,
          })),
        })
        return post
      })
    })
  }

  async delete(id: string, userId: string) {
    const post = await this.repo.findByUserAndId(undefined, {
      userId,
      postId: id,
    })
    if (!post) throw ApiError.NotFoundError('Статья не найдена')
    return prisma.post.delete({ where: { id, authorId: userId } })
  }

  async update(data: UpdatePostRequestDto, postId: string, userId: string) {
    const { title, tagIds } = data
    const post = await this.repo.findByUserAndId(undefined, { userId, postId })
    if (!post) throw ApiError.NotFoundError('Статья не найдена')
    const isChangedTitle =
      title && title.trim().toLowerCase() !== post.title.trim().toLowerCase()
    const slug = isChangedTitle
      ? slugify.default(title, {
          lower: true,
          strict: true,
        })
      : undefined

    const existingTagIds = post.tags.map((t) => t.tag.id)
    const toAdd = tagIds?.filter((id) => !existingTagIds.includes(id)) ?? []
    const toRemove = existingTagIds.filter((id) => !tagIds?.includes(id))

    return this.repo.update({
      dataToUpdate: { ...data, slug },
      postId,
      tagsToAdd: toAdd,
      tagsToRemove: toRemove,
    })
  }

  async likeOrDislike(userId: string, postId: string, value: 1 | -1) {
    return prisma.$transaction(async (tx) => {
      const existing = await tx.postVote.findUnique({
        where: {
          user_id_post_id: { user_id: userId, post_id: postId },
        },
      })
      if (existing) {
        throw ApiError.BadRequest(
          `Вы уже поставили ${existing.value === 1 ? 'лайк' : 'дизлайк'}`
        )
      }
      return tx.postVote.create({
        data: { value, user_id: userId, post_id: postId },
      })
    })
  }
  async getStatistic(id: string, userId?: string) {
    const stats = await prisma.post.findUnique({
      where: { id },
      select: {
        views: true,
        comments: { select: { id: true } },
        postVotes: { select: { user_id: true, value: true } },
      },
    })
    if (!stats) throw ApiError.NotFoundError()
    const base = toStatistic(stats.postVotes, stats.comments, stats.views)
    const userVote = userId
      ? (stats.postVotes.find((v) => v.user_id === userId)?.value ?? null)
      : null
    return {
      ...base,
      votes: { ...base.votes, userVote },
    }
  }
  async updateViews(id: string) {
    return prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    })
  }
  async assertCanEdit(
    postId: string,
    userId: string,
    role: string
  ): Promise<void> {
    const post = await this.getById(postId)
    if (post.author.id !== userId && role !== 'ADMIN')
      throw ApiError.ForbiddenError()
  }
}
