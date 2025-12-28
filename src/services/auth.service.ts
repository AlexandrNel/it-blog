import { NotFoundError } from "~/lib/errors/index.js";
import { prisma } from "~/lib/prisma.js";
import bcrypt from 'bcrypt'
import { signToken } from "~/utils/jwt.js";
import { AppError } from "~/lib/errors/AppError.js";
import type { LoginDataType, RegisterDataType } from "~/dto/auth.dto.js";


export class AuthService {
    async getMe(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, createdAt: true, role: true },
        });

        if (!user) throw new NotFoundError("Пользователь не найден")
        return user;
    }
    async register(data: RegisterDataType) {

        const candidat = await prisma.user.findUnique({ where: { email: data.email } })
        if (candidat) throw new AppError('Пользователь с таким email уже существует', 403)

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(data.password, salt);
        const newUser = await prisma.user.create({
            omit: { password: true },
            data: {
                email: data.email,
                password: passwordHash
            }
        })

        const token = signToken({ id: newUser.id, role: newUser.role })
        return { token, user: newUser }
    };
    async login(data: LoginDataType) {
        const user = await prisma.user.findUnique({ where: { email: data.email } })
        if (!user) throw new NotFoundError("Пользователь не найден")
        const isVerify = await bcrypt.compare(data.password, user.password)
        if (!isVerify) throw new AppError("Не верный логин или пароль", 400)
        const token = signToken({ id: user.id, role: user.role })
        const { password, ...userWithoutPassword } = user
        return { token, user: userWithoutPassword }
    }
}