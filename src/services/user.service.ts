import type { User } from "~/generated/prisma/client.js";
import { PrismaTxWrapper } from "~/shared/helpers/prismaTxWrapper.js";
import { ApiError } from "~/shared/lib/api-error.js";
import { prisma } from "~/shared/lib/prisma.js";
import { ProfileService } from "./profile.service.js";
import {
  names,
  NumberDictionary,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { comparePassword, hashPassword } from "~/shared/utils/password.js";

type HasUserRequest = { id: string } | { username: string };

export class UserService {
  constructor(private profileService: ProfileService) {}
  getUserById = PrismaTxWrapper<Omit<User, "password">, HasUserRequest>(
    async (client, data: HasUserRequest) => {
      const user = await client.user.findUnique({
        where: data,
        omit: { password: true },
      });
      if (!user) throw ApiError.NotFoundError("Пользователь не найден");
      return user;
    },
  );
  async getSettingsByUserId(id: string) {
    const settings = await prisma.$transaction(async (tx) => {
      const user = await this.getUserById({ id }, tx);
      const data = await this.profileService.getByUserIdOrUsername(id);
      return {
        profile: data.profile,
        account: {
          username: user.username,
          email: user.email,
        },
        meta: { emailVerified: !user.pendingEmail },
      };
    });
    return settings;
  }
  async updateUsername(username: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const data = await this.usernameIsAvailable({ username }, tx);
      if (!data.isAvailable) throw ApiError.BadRequest("Никнейм занят");
      await tx.user.update({
        where: { id: userId },
        data: { username: username },
      });
    });
  }
  async updatePassword(
    oldPassword: string,
    newPassword: string,
    userId: string,
  ) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ApiError.NotFoundError("Пользователь не найден");
    const isVerify = await comparePassword(oldPassword, user.password);
    if (!isVerify) throw ApiError.BadRequest("Неверный пароль");
    const password = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { password },
    });
  }

  async generateUniqueUsername(email?: string | null): Promise<string> {
    const number = NumberDictionary.generate({ length: 3 });
    const randomName = uniqueNamesGenerator({
      dictionaries: email ? [[email], number] : [names, number],
      style: "capital",
      separator: "",
    });
    return randomName;
  }
  usernameIsAvailable = PrismaTxWrapper(
    async (client, data: { username: string }) => {
      if (!data.username) throw ApiError.BadRequest("Не передан параметр");
      const isExist = await client.user.findUnique({
        where: { username: data.username },
      });
      return { user: isExist, isAvailable: !isExist };
    },
  );
}
