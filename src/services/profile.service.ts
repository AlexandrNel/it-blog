import { prisma } from "~/shared/lib/prisma.js";
import { ApiError } from "~/shared/lib/api-error.js";
import {
  type ProfileStatsDto,
  type UpdateProfileRequestDto,
} from "~/dto/profile.dto.js";
import { AuthorDto } from "~/dto/user.dto.js";

const profileSelect = {
  bio: true,
  avatar: true,
  contacts: true,
  firstName: true,
  lastName: true,
  isPublic: true,
  createdAt: true,
  id: true,
} as const;

export class ProfileService {
  async getById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: { select: profileSelect } },
    });
    if (!user) throw ApiError.NotFoundError("Пользователь не найден");

    return {
      author: new AuthorDto(user, user.profile?.avatar),
      contacts: user.profile?.contacts,
      bio: user.profile?.bio ?? "",
    };
  }

  async updateById(
    userId: string,
    viewerUserId: string,
    data: UpdateProfileRequestDto,
  ) {
    if (viewerUserId !== userId) throw ApiError.ForbiddenError();

    const exists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!exists) throw ApiError.NotFoundError("Пользователь не найден");
    await prisma.profile.update({
      where: { userId: userId },
      data,
    });

    return this.getById(userId);
  }
  async getStatisticById(userId: string) {
    return prisma.$transaction(async (tx) => {
      const profile = await tx.profile.findUnique({ where: { userId } });

      if (!profile) throw ApiError.NotFoundError("Профиль не найден");
      const [count, views] = await Promise.all([
        tx.post.count({ where: { authorId: profile.userId, published: true } }),
        tx.post.aggregate({
          where: { authorId: profile.userId },
          _sum: { views: true },
        }),
      ]);
      const stats: ProfileStatsDto = {
        viewers: views._sum.views ?? 0,
        publishedPosts: count,
        subscribers: 0,
      };
      return stats;
    });
  }

  async getMetaById(userId: string, viewerUserId?: string) {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: { user: true },
    });
    if (!profile) throw ApiError.NotFoundError("Профиль не найден");

    return {
      isOwner: viewerUserId === userId,
      isPublic: profile.isPublic,
      isBlocked: profile.user.isBlocked,
    };
  }
}
