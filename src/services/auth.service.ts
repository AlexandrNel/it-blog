import { prisma } from "~/shared/lib/prisma.js";
import bcrypt from 'bcrypt'
import { signToken } from "~/shared/utils/jwt.js";
import { ApiError } from "~/shared/lib/api-error.js";
import type { LoginDataType, RegisterDataType } from "~/dto/auth.dto.js";
import { UserDto } from "~/dto/user.dto.js";

class AuthService {
    async getMe(userId: string) {
        const user = await prisma.user.findUnique({ where: { id: userId }, });
        if (!user) throw ApiError.NotFoundError("Пользователь не найден")
        const useDto = new UserDto(user)
        return useDto;
    }
    async register(data: RegisterDataType) {
        const candidat = await prisma.user.findUnique({ where: { email: data.email } })
        if (candidat) throw ApiError.BadRequest('Пользователь с таким email уже существует')
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.password, salt);
        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                password: passwordHash
            }
        })
        const useDto = new UserDto(newUser)
        const token = signToken({ id: useDto.id, role: useDto.role })
        return { token, user: useDto }
    };
    async login(data: LoginDataType) {
        const user = await prisma.user.findUnique({ where: { email: data.email } })
        if (!user) throw ApiError.NotFoundError("Пользователь не найден")
        const useDto = new UserDto(user)
        const isVerify = await bcrypt.compare(data.password, user.password)
        if (!isVerify) throw ApiError.BadRequest("Не верный логин или пароль")
        const token = signToken({ id: user.id, role: user.role })
        const refresh = signToken({ id: user.id, role: user.role }, 'refresh')
        return { token, refresh, user: useDto }
    }
}

export default new AuthService()