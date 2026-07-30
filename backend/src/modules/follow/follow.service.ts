import { prisma } from '@/shared/lib/prisma.js'
import type { UserService } from '../user/user.service.js'
import { ApiError } from '@/shared/lib/api-error.js'
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace.js'
// TODO: убрать отсюда импорт prismaNamespace
export class FollowService {
  constructor() {}
  async getFollowingStatus(authorId: string, userId: string) {
    const isFollower = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: authorId,
        },
      },
    })
    return !!isFollower
  }
  async follow(userId: string, authorId: string) {
    if (userId === authorId)
      throw ApiError.BadRequest('Нельзя подписаться на себя')
    try {
      return await prisma.follow.create({
        data: { followerId: userId, followingId: authorId },
      })
    } catch (error) {
      if ((error as PrismaClientKnownRequestError).code === 'P2002') {
        throw ApiError.BadRequest('Вы уже подписаны')
      }
      throw error
    }
  }
  async unfollow(userId: string, authorId: string) {
    return await prisma.follow.deleteMany({
      where: { followerId: userId, followingId: authorId },
    })
  }
}
