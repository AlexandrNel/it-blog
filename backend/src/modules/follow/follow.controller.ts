import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { requireParam, requireUser } from '@/shared/helpers/request.helpers.js'
import { getUserSafe } from '@/middlewares/user.middleware.js'
import { FollowService } from './follow.service.js'
import { FollowRequestSchema } from './follow.validation.js'
import { ApiError } from '@/shared/lib/api-error.js'

const isFollowing = (value: boolean) => ({ isFollowing: value })

export class FollowController {
  constructor(private service: FollowService) {}
  getFollowingStatus = asyncHandler(async (req, res) => {
    const authorId = requireParam(req, 'userId', 'Не передан userId')
    const user = getUserSafe(req)
    if (!user) return res.json(isFollowing(false))
    const isFollower = await this.service.getFollowingStatus(authorId, user?.id)
    res.json(isFollowing(isFollower))
  })
  follow = asyncHandler(async (req, res) => {
    const author = await FollowRequestSchema.parseAsync(req.body)
    const user = requireUser(req)
    await this.service.follow(user.id, author.userId)
    res.json(isFollowing(true))
  })
  unfollow = asyncHandler(async (req, res) => {
    const author = await FollowRequestSchema.parseAsync(req.body)
    const user = requireUser(req)
    await this.service.unfollow(user.id, author.userId)
    res.json(isFollowing(false))
  })
}
