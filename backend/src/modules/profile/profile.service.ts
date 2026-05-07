import { prisma } from '@/shared/lib/prisma.js'
import { ApiError } from '@/shared/lib/api-error.js'
import {
  type ProfileConnectionKind,
  type ProfileConnectionsPageDto,
  type ProfileConnectionsSummaryDto,
  type ProfileContactsDto,
  type ProfileStatsDto,
  type UpdateProfileRequestDto,
} from './profile.dto.js'
import { toAuthor } from '../user/index.js'
import type { Prisma } from '../../../generated/prisma/client.js'
import { isIdOrUsername } from '@/shared/helpers/username-or-id.js'

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

const profileConnectionUserSelect = {
  id: true,
  avatar: true,
  displayName: true,
  username: true,
} as const

export class ProfileService {

  private async getUserByIdOrUsername(value: string) {
    const type = isIdOrUsername(value)
    const user = await prisma.user.findUnique({
      where: type === 'username' ? { username: value } : { id: value },
      select: { id: true },
    })
    if (!user) throw ApiError.NotFoundError('Пользователь не найден')
    return user
  }

  async getByUserIdOrUsername(value: string) {
    const type = isIdOrUsername(value)
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
      data: profile
    })
  }

  async getStatisticById(value: string) {
    return prisma.$transaction(async (tx) => {
      const type = isIdOrUsername(value)
      
      const profile = await tx.user
        .findUnique({
          where: type === 'id' ? { id: value } : { username: value },
          include: { profile: true },
        })
        .then((u) => u?.profile)
      if (!profile) throw ApiError.NotFoundError('Профиль не найден')

      const [published, unpublished, views, comments, subscribers] =
        await Promise.all([
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
          tx.follow.count({ where: { followingId: profile.userId } }),
        ])

      const stats: ProfileStatsDto = {
        viewers: views._sum.views ?? 0,
        publishedPosts: published,
        unpublishedPosts: unpublished,
        subscribers,
        comments,
      }
      return stats
    })
  }

  async getConnectionsSummary(
    value: string
  ): Promise<ProfileConnectionsSummaryDto> {
    const user = await this.getUserByIdOrUsername(value)
    
    const [followers, following] = await prisma.$transaction([
      prisma.follow.count({ where: { followingId: user.id } }),
      prisma.follow.count({ where: { followerId: user.id } }),
    ])

    return { followers, following }
  }

  async getConnectionsPage(
    value: string,
    kind: ProfileConnectionKind,
    page: number,
    limit: number
  ): Promise<ProfileConnectionsPageDto> {
    const user = await this.getUserByIdOrUsername(value)
    const skip = (page - 1) * limit
    if (kind === 'followers') {
      const where = { followingId: user.id }
      const [total, follows] = await prisma.$transaction([
        prisma.follow.count({ where }),
        prisma.follow.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          select: {
            follower: {
              select: profileConnectionUserSelect,
            },
          },
        }),
      ])

      return {
        users: follows.map((follow) => follow.follower),
        nextPage: skip + follows.length < total ? page + 1 : null,
        total,
      }
    }

    const where = { followerId: user.id }
    const [total, follows] = await prisma.$transaction([
      prisma.follow.count({ where }),
      prisma.follow.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          following: {
            select: profileConnectionUserSelect,
          },
        },
      }),
    ])

    return {
      users: follows.map((follow) => follow.following),
      nextPage: skip + follows.length < total ? page + 1 : null,
      total,
    }
  }

  async getMetaById(value: string, viewerUserId?: string) {
    const type = isIdOrUsername(value)
      console.log("type", type, "username", value);

    const user = await prisma.user.findUnique({
      where: type === 'username' ? { username: value } : { id: value },
      include: { profile: true, followers: true },
    })
    if (!user) throw ApiError.NotFoundError('Профиль не найден')
    const isOwner = viewerUserId === user.id
    const isPublic = user.profile?.isPublic ?? true

    if (isOwner) {
      return {
        isOwner: true as const,
        isPublic,
        isBlocked: user.isBlocked,
      }
    }

    return {
      isOwner: false as const,
      isFollow: !!user.followers.find((f) => f.followerId === viewerUserId),
      isPublic,
      isBlocked: user.isBlocked,
    }
  }
}
