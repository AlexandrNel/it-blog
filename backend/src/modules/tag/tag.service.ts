import { prisma } from '@/shared/lib/prisma.js'
import type { Role } from '@/generated/prisma/enums.js'
import type { TagFindManyArgs } from '@/generated/prisma/models.js'

const tagSelect = {
  id: true,
  name: true,
  key: true,
}

export class TagService {
  private getRoleFilter(role?: Role): TagFindManyArgs['where'] {
    if (role === 'MODERATOR' || role === 'ADMIN') return {}
    return { availableFor: { has: 'USER' } }
  }
  async getAll(role?: Role) {
    return prisma.tag.findMany({
      where: this.getRoleFilter(role),
      select: tagSelect,
    })
  }
  async getPopular(limit: number = 5, role?: Role) {
    return prisma.tag.findMany({
      where: {
        posts: {
          some: {}, // только теги у которых есть хотя бы одна статья
        },
        ...this.getRoleFilter('USER'),
      },
      select: {
        ...tagSelect,
        _count: {
          select: { posts: true },
        },
      },
      orderBy: {
        posts: {
          _count: 'desc',
        },
      },
      take: limit,
    })
  }
}
