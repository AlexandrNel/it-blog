import { prisma } from "~/lib/prisma.js";

export class TagService {
    async getAll() {
        const tags = await prisma.tag.findMany({ select: { name: true } })
        return tags
    }
}