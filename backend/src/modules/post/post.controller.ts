import type { Request, Response } from 'express'
import {
  SearchPostsSchema,
  SortSchema,
  updatePostSchema,
  validateCreatePost,
} from './lib/post.validation.js'
import type { PaginationParams } from '@/middlewares/paginate.middleware.js'
import { PostService } from './post.service.js'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { requireParam, requireUser } from '@/shared/helpers/request.helpers.js'
import { ApiError } from '@/shared/lib/api-error.js'

export class PostController {
  constructor(private readonly service: PostService) {}

  search = asyncHandler(async (req, res) => {
    const { q, sort, page, limit, date, title } = SearchPostsSchema.parse(
      req.query
    )

    if (!q) throw ApiError.NotFoundError()
    const all = await this.service.search({ q, sort, page, limit, date, title })
    res.json(all)
  })

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.pagination as PaginationParams
    const result = await SortSchema.safeParseAsync(req.query.sortBy)

    const all = await this.service.getAllWithPages(
      Number(limit),
      Number(page),
      result.data
    )
    res.json(all)
  })

  getById = asyncHandler(async (req: Request, res: Response) => {
    const id = requireParam(req, 'id', 'Не передан id статьи')
    res.json(await this.service.getById(id))
  })

  getBySlug = asyncHandler(async (req: Request, res: Response) => {
    const slug = requireParam(req, 'slug', 'Не указан slug')
    const a = await this.service.getBySlug(slug)
    console.log(a)

    res.json(a)
  })

  getAllByUserId = asyncHandler(async (req: Request, res: Response) => {
    const userId = requireParam(req, 'userId', 'Не передан id пользователя')
    console.log(userId)

    res.json(await this.service.getAllByUserId(userId))
  })

  getSomeByTag = asyncHandler(async (req: Request, res: Response) => {
    const tag = requireParam(req, 'tag', 'Не указан тег')
    res.json(await this.service.getAllByTag(tag))
  })

  createPost = asyncHandler(async (req: Request, res: Response) => {
    const user = requireUser(req)
    const data = await validateCreatePost({ ...req.body, authorId: user.id })
    res.status(201).json(await this.service.create(data))
  })

  updatePost = asyncHandler(async (req: Request, res: Response) => {
    const user = requireUser(req)
    const id = requireParam(req, 'id', 'Не передан id статьи')
    const data = await updatePostSchema.parseAsync(req.body)
    console.log(id)

    res.status(200).json(await this.service.update(data, id, user.id))
  })

  deletePost = asyncHandler(async (req: Request, res: Response) => {
    const user = requireUser(req)
    const id = requireParam(req, 'id', 'Не передан id статьи')
    await this.service.delete(id, user.id)
    res.status(204).send()
  })

  getStatistic = asyncHandler(async (req: Request, res: Response) => {
    const id = requireParam(req, 'id', 'Не передан id статьи')
    res.json(await this.service.getStatistic(id, req.user?.id))
  })

  likePost = asyncHandler(async (req: Request, res: Response) => {
    const user = requireUser(req)
    const postId = requireParam(req, 'id', 'Не передан id статьи')
    await this.service.likeOrDislike(user.id, postId, 1)
    res.status(204).send()
  })

  dislikePost = asyncHandler(async (req: Request, res: Response) => {
    const user = requireUser(req)
    const postId = requireParam(req, 'id', 'Не передан id статьи')
    await this.service.likeOrDislike(user.id, postId, -1)
    res.status(204).send()
  })

  incrementView = asyncHandler(async (req: Request, res: Response) => {
    const id = requireParam(req, 'id', 'Не передан id статьи')
    await this.service.updateViews(id)
    res.status(200).json({ ttl: req.updateView!.ttl })
  })

  checkIsAuthor = asyncHandler(async (req: Request, res: Response) => {
    const user = requireUser(req)
    const postId = requireParam(req, 'id', 'Не передан id статьи')
    await this.service.assertCanEdit(postId, user.id, user.role)
    res.status(200).json({ canEdit: true })
  })
}
