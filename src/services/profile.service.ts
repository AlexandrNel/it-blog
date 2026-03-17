import { prisma } from "~/shared/lib/prisma.js";
import { ApiError } from "~/shared/lib/api-error.js";
import {
  type ProfileStatsDto,
  type UpdateProfileRequestDto,
} from "~/dto/profile.dto.js";
import { AuthorDto } from "~/dto/user.dto.js";
import type { User } from "~/generated/prisma/client.js";
import type { keyof } from "zod";

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
type ResponseByType = keyof Pick<User, "id" | "nickname">;
export class ProfileService {
  private isIdOrNickname(id: string): "id" | "nickname" {
    const isNickname = id.match(/^[a-zA-Z0-9]{6,25}$/gim);
    return isNickname ? "nickname" : "id";
  }
  async getByUserIdOrNickname(value: string) {
    const type = this.isIdOrNickname(value);
    const user = await prisma.user.findUnique({
      where: type === "nickname" ? { nickname: value } : { id: value },
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

    return this.getByUserIdOrNickname(userId);
  }
  async getStatisticById(value: string) {
    return prisma.$transaction(async (tx) => {
      const type = this.isIdOrNickname(value);
      const profile = await tx.user
        .findUnique({
          where: type === "nickname" ? { nickname: value } : { id: value },
          include: { profile: true },
        })
        .then((u) => u?.profile);
      if (!profile) throw ApiError.NotFoundError("Пользователь не найден");
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

  async getMetaById(value: string, viewerUserId?: string) {
    const type = this.isIdOrNickname(value);
    const user = await prisma.user.findUnique({
      where: type === "nickname" ? { nickname: value } : { id: value },
      include: { profile: true },
    });
    if (!user) throw ApiError.NotFoundError("Пользователь не найден");

    return {
      isOwner: viewerUserId === user.id,
      isPublic: user?.profile?.isPublic,
      isBlocked: user.isBlocked,
    };
  }
}
