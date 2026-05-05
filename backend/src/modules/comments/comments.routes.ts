import express from 'express'
import { CommentController } from './comments.controller.js'
import { authMiddleware } from '@/middlewares/auth.middleware.js'
import { CommentService } from './comments.service.js'

const router = express.Router()
const controller = new CommentController(new CommentService())

router.get('/comments/post/:slug', controller.getCommentTreeByPostSlug)
router.get('/comments/user/:userId', controller.getByUserId)
router.post('/comments/post/:slug', authMiddleware, controller.createForPost)
router.post(
  '/comments/:commentId/reply',
  authMiddleware,
  controller.replyToComment
)
router.post('/comments/:commentId/edit', authMiddleware, controller.editComment)
router.delete('/comments/:id', authMiddleware, controller.deleteComment)

export default router
