import { prisma } from '@/shared/lib/prisma.js'
import type { Role } from '@/generated/prisma/enums.js'

const tagSelect = {
  id: true,
  name: true,
  key: true,
}

export class TagService {
  private getRoleFilter(role?: Role) {
    if (role === 'USER' || !role) {
      return {
        NOT: { availableFor: { has: 'ADMIN' as Role } },
        category: { none: { availableFor: { has: 'ADMIN' as Role } } },
      }
    }
    return {}
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
