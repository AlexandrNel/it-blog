import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { requireParam, requireUser } from '@/shared/helpers/request.helpers.js'
import { CommentPayloadSchema } from './comments.validation.js'
import { CommentService } from './comments.service.js'
import { isIdOrUsername } from '@/shared/helpers/username-or-id.js'

export class CommentController {
  constructor(private service: CommentService) {}

  getCommentTreeByPostSlug = asyncHandler(async (req, res) => {
    const slug = requireParam(req, 'slug', 'Не передан slug')
    res.json(await this.service.getCommentTreeByPostSlug(slug))
  })

  getBySlug = asyncHandler(async (req, res) => {
    const slug = requireParam(req, 'slug', 'Не передан slug')

    res.json(await this.service.getBySlug(slug))
  })

  getByUserId = asyncHandler(async (req, res) => {
    const userId = requireParam(req, 'userId', 'Не передан userId')
    const type = isIdOrUsername(userId)
    if (type === 'id') res.json(await this.service.getByUserId(userId))
    else res.json(await this.service.getByUsername(userId))
  })

  createForPost = asyncHandler(async (req, res) => {
    const slug = requireParam(req, 'slug', 'Не передан slug')
    const { content } = await CommentPayloadSchema.parseAsync(req.body)
    const user = requireUser(req)
    const comment = await this.service.createForPost(slug, user.id, content)
    res.status(201).json(comment)
  })

  replyToComment = asyncHandler(async (req, res) => {
    const commentId = requireParam(req, 'commentId', 'Не передан commentId')
    const { content } = await CommentPayloadSchema.parseAsync(req.body)
    const user = requireUser(req)
    const comment = await this.service.reply(commentId, user.id, content)
    res.status(201).json(comment)
  })
  editComment = asyncHandler(async (req, res) => {
    
    const commentId = requireParam(req, 'commentId', 'Не передан commentId')
    console.log(commentId);
    const { content } = await CommentPayloadSchema.parseAsync(req.body)
    const user = requireUser(req)
    await this.service.editComment(commentId, user.id, content)
    res.status(204).end()
  })

  deleteComment = asyncHandler(async (req, res) => {
    const id = requireParam(req, 'id', 'Не передан id')
    const user = requireUser(req)
    await this.service.deleteComment(id, user.id, user.role)
    res.status(204).end()
  })
}
