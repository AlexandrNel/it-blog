import { NotFoundError } from "~/lib/errors/index.js";
import { prisma } from "~/lib/prisma.js";

export class AuthService {
    async getMe(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true, createdAt: true, role: true },
        });

        if (!user) throw new NotFoundError("Пользователь не найден")
        return user;
    }
}