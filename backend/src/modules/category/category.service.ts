import type { Role } from '@/generated/prisma/enums.js'
import type { CategoryFindManyArgs } from '@/generated/prisma/models.js'
import { prisma } from '@/shared/lib/prisma.js'

export class CategoryService {
  private getRoleFilter(role?: Role): CategoryFindManyArgs['where'] {
    if (role === 'ADMIN' || role === 'MODERATOR') return {}
    return { availableFor: { has: 'USER' } }
  }
  async getAll(role?: Role) {
    const tags = await prisma.category.findMany({
      where: this.getRoleFilter(role),
      select: { id: true, key: true, value: true },
    })
    return tags
  }
}
