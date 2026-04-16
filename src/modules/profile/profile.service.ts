import { prisma } from '@/shared/lib/prisma.js'
import { ApiError } from '@/shared/lib/api-error.js'
import {
  type ProfileContactsDto,
  type ProfileStatsDto,
  type UpdateProfileRequestDto,
} from './profile.dto.js'
import { toAuthor } from '../user/index.js'
import type { Prisma } from '@/generated/prisma/client.js'

const profileSelect: Pick<
  Prisma.ProfileSelect,
  'bio' | 'contacts' | 'isPublic' | 'createdAt' | 'id'
> = {
  bio: true,
  contacts: true,
  isPublic: true,
  createdAt: true,
  id: true,
} as const

export class ProfileService {
  private isIdOrUsername(id: string): 'id' | 'username' {
    const isUsername = id.match(/^[a-zA-Z0-9]{6,25}$/gim)
    return isUsername ? 'username' : 'id'
  }
  async getByUserIdOrUsername(value: string) {
    const type = this.isIdOrUsername(value)
    const user = await prisma.user.findUnique({
      where: type === 'username' ? { username: value } : { id: value },
      include: { profile: { select: profileSelect } },
    })
    if (!user) throw ApiError.NotFoundError('Пользователь не найден')
    const result = {
      author: toAuthor(user),
      contacts: user.profile?.contacts as ProfileContactsDto,
      bio: user.profile?.bio ?? '',
      profile: user.profile!,
    }
    return result
  }

  async updateProfile(userId: string, data: UpdateProfileRequestDto) {
    const { displayName, ...profile } = data
    await prisma.user.update({ where: { id: userId }, data: { displayName } })
    return await prisma.profile.update({
      where: { userId: userId },
      data: profile,
    })
  }
  async getStatisticById(value: string) {
    return prisma.$transaction(async (tx) => {
      const type = this.isIdOrUsername(value)
      const profile = await tx.user
        .findUnique({
          where: type === 'id' ? { id: value } : { username: value },
          include: { profile: true },
        })
        .then((u) => u?.profile)
      if (!profile) throw ApiError.NotFoundError('Пользователь не найден')
      const [published, unpublished, views, comments] = await Promise.all([
        tx.post.count({
          where: { author: { [type]: value }, published: true },
        }),
        tx.post.count({
          where: { author: { [type]: value }, published: false },
        }),
        tx.post.aggregate({
          where: { authorId: profile.userId },
          _sum: { views: true },
        }),
        tx.comment.count({ where: { authorId: profile.userId } }),
      ])

      const stats: ProfileStatsDto = {
        viewers: views._sum.views ?? 0,
        publishedPosts: published,
        unpublishedPosts: unpublished,
        subscribers: 0,
        comments,
      }
      return stats
    })
  }

  async getMetaById(value: string, viewerUserId?: string) {
    const type = this.isIdOrUsername(value)
    const user = await prisma.user.findUnique({
      where: type === 'username' ? { username: value } : { id: value },
      include: { profile: true, followers: true },
    })
    if (!user) throw ApiError.NotFoundError('Пользователь не найден')
    const isOwner = viewerUserId === user.id
    const isFollow = isOwner
      ? undefined
      : !!user.followers.find((f) => f.followerId === viewerUserId)

    return {
      isOwner,
      isFollow,
      isPublic: user?.profile?.isPublic,
      isBlocked: user.isBlocked,
    }
  }
}
