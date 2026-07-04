import { prisma } from '@/shared/lib/prisma.js'
import type { UserService } from '../user/user.service.js'
import { ApiError } from '@/shared/lib/api-error.js'
import { PrismaClientKnownRequestError } from '@/generated/prisma/internal/prismaNamespace.js'
// TODO: убрать отсюда импорт prismaNamespace
export class FollowService {
  constructor(private userService: UserService) {}
  getFollowingStatus(authorId: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const author = await this.userService.getUserById(tx, { id: authorId })
      const user = await this.userService.getUserById(tx, { id: userId })
      const isFollower = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: user.id,
            followingId: author.id,
          },
        },
      })
      return !!isFollower
    })
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
