import express from 'express'
import { FollowService } from './follow.service.js'
import { UserService } from '../user/user.service.js'
import { ProfileService } from '../profile/profile.service.js'
import { withUserMiddleware } from '@/middlewares/user.middleware.js'
import { FollowController } from './follow.controller.js'
import { authMiddleware } from '@/middlewares/auth.middleware.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()
const c = new FollowController(
  new FollowService(new UserService(new ProfileService()))
)

const followLimit = rateLimit({
  windowMs: 10 * 1000,
  limit: 5,
  message: {
    message: "Что ты тыкаешь?) Решись уже — подписан ты или нет."
  }
})

router.get('/follows/status/:userId', withUserMiddleware, c.getFollowingStatus)
router.post('/follows/follow', followLimit, authMiddleware, c.follow)
router.post('/follows/unfollow',followLimit, authMiddleware, c.unfollow)

export default router
