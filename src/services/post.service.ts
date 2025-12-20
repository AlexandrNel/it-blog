import { prisma } from "~/lib/prisma.js";

export class PostService {
    async getAll() {
        const posts = await prisma.post.findMany({ include: { author: { omit: { password: true } }, tags: true } })
        return posts
    }
    async getById(id: string) {
        const posts = await prisma.post.findUnique({ where: { id }, include: { author: { omit: { password: true } }, tags: true } })
        return posts
    }
}