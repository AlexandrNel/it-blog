import { prisma } from "~/shared/lib/prisma.js";
import bcrypt from "bcrypt";
import { signToken } from "~/shared/utils/jwt.js";
import { ApiError } from "~/shared/lib/api-error.js";
import {
  loginSchema,
  type LoginDataType,
  type RegisterDataType,
} from "~/dto/auth.dto.js";
import { UserDto } from "~/dto/user.dto.js";
import z from "zod";

class AuthService {
  async getMe(userId?: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: { select: { avatar: true } } },
    });
    if (!user) throw ApiError.NotFoundError("Пользователь не найден");
    const useDto = new UserDto(user, user.profile?.avatar);
    return useDto;
  }
  async register(data: RegisterDataType) {
    const candidat = await prisma.$transaction(async (tx) => {
      const a = await tx.user.findUnique({
        where: { email: data.email },
      });
      const b = await tx.user.findUnique({
        where: { nickname: data.nickname },
      });
      if (a) return { text: "email" };
      if (b) return { text: "nickname" };
      return null;
    });
    if (candidat)
      throw ApiError.BadRequest(
        `Пользователь с таким ${candidat.text} уже существует`,
      );
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          nickname: data.nickname,
          email: data.email,
          password: passwordHash,
        },
      });
      await tx.profile.create({ data: { userId: user.id } });
      return user;
    });
    const useDto = new UserDto(newUser);
    const token = signToken({ id: useDto.id, role: useDto.role });
    return { token, user: useDto };
  }
  async login(data: LoginDataType) {
    const result = await loginSchema.parseAsync(data);
    const isEmail = await z.email().safeParseAsync(result.login);
    const user = await prisma.user.findUnique({
      where: isEmail ? { email: result.login } : { nickname: result.login },
    });
    if (!user) throw ApiError.NotFoundError("Пользователь не найден");
    const useDto = new UserDto(user);
    const isVerify = await bcrypt.compare(data.password, user.password);
    if (!isVerify) throw ApiError.BadRequest("Не верный логин или пароль");
    const token = signToken({ id: user.id, role: user.role });
    const refresh = signToken({ id: user.id, role: user.role }, "refresh");
    return { token, refresh, user: useDto };
  }
}

export default new AuthService();
