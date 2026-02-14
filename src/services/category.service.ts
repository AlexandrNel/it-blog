import { prisma } from "~/lib/prisma.js";

export class CategoryService {
    async getAll() {
        const tags = await prisma.category.findMany({ select: { id: true, key: true, value: true } })
        return tags
    }
}