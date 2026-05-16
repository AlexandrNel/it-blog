import express from 'express'
import { PostController } from './post.controller.js'
import { authMiddleware } from '@/middlewares/auth.middleware.js'
import { paginateMiddleware } from '@/middlewares/paginate.middleware.js'
import { postViewsMiddleware } from '@/middlewares/post-views.middleware.js'
import { withUserMiddleware } from '@/middlewares/user.middleware.js'
import { PostService } from './post.service.js'
import { PostRepository } from './post.repository.js'

const router = express.Router()
const controller = new PostController(new PostService(new PostRepository()))

router.get('/search/posts', controller.search)
router.get('/posts', paginateMiddleware, controller.getAll)
router.get('/posts/user/:userId', controller.getAllByUserId)
router.get('/posts/id/:id', controller.getById)
router.get('/posts/:slug', controller.getBySlug)
router.get('/posts/tag/:tag', controller.getSomeByTag)
router.get('/posts/:id/statistic', withUserMiddleware, controller.getStatistic)
router.get('/posts/:id/can-edit', authMiddleware, controller.checkIsAuthor) // удалить

router.post('/posts', authMiddleware, controller.createPost)
router.delete('/posts/:id', authMiddleware, controller.deletePost)
router.patch('/posts/:id', authMiddleware, controller.updatePost)
router.post('/posts/:id/like', authMiddleware, controller.likePost)
router.post('/posts/:id/dislike', authMiddleware, controller.dislikePost)
router.post('/posts/:id/views', postViewsMiddleware, controller.incrementView)

export default router
