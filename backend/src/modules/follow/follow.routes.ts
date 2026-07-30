import express from 'express'
import { FollowService } from './follow.service.js'
import { withUserMiddleware } from '@/middlewares/user.middleware.js'
import { FollowController } from './follow.controller.js'
import { authMiddleware } from '@/middlewares/auth.middleware.js'
import { mutationLimiter } from '@/middlewares/rate-limit.js'

const router = express.Router()
const { getFollowingStatus, follow, unfollow } = new FollowController(
  new FollowService()
)

router.get('/follows/status/:userId', withUserMiddleware, getFollowingStatus)
router.post('/follows/follow', mutationLimiter, authMiddleware, follow)
router.post('/follows/unfollow', mutationLimiter, authMiddleware, unfollow)

export default router
