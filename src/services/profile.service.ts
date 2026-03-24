import { prisma } from "~/shared/lib/prisma.js";
import { ApiError } from "~/shared/lib/api-error.js";
import {
  type ProfileContactsDto,
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
  private isIdOrUsername(id: string): "id" | "username" {
    const isUsername = id.match(/^[a-zA-Z0-9]{6,25}$/gim);
    return isUsername ? "username" : "id";
  }
  async getByUserIdOrUsername(value: string) {
    const type = this.isIdOrUsername(value);
    const user = await prisma.user.findUnique({
      where: type === "username" ? { username: value } : { id: value },
      include: { profile: { select: profileSelect } },
    });
    if (!user) throw ApiError.NotFoundError("Пользователь не найден");
    const result = {
      author: new AuthorDto(user, user.profile?.avatar),
      contacts: user.profile?.contacts as ProfileContactsDto,
      bio: user.profile?.bio ?? "",
      profile: user.profile!,
    };
    return result;
  }

  async updateProfile(userId: string, data: UpdateProfileRequestDto) {
    return await prisma.profile.update({
      where: { userId: userId },
      data,
    });
  }
  async getStatisticById(value: string) {
    return prisma.$transaction(async (tx) => {
      const type = this.isIdOrUsername(value);
      const profile = await tx.user
        .findUnique({
          where: type === "username" ? { username: value } : { id: value },
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
    const type = this.isIdOrUsername(value);
    const user = await prisma.user.findUnique({
      where: type === "username" ? { username: value } : { id: value },
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
