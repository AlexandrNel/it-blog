import express from 'express'
import { FollowService } from './follow.service.js'
import { UserService } from '../user/user.service.js'
import { ProfileService } from '../profile/profile.service.js'
import { withUserMiddleware } from '@/middlewares/user.middleware.js'
import { FollowController } from './follow.controller.js'
import { authMiddleware } from '@/middlewares/auth.middleware.js'

const router = express.Router()
const c = new FollowController(
  new FollowService(new UserService(new ProfileService()))
)

router.get('/follows/status/:userId', withUserMiddleware, c.getFollowingStatus)
router.post('/follows/follow', authMiddleware, c.follow)
router.post('/follows/unfollow', authMiddleware, c.unfollow)

export default router
