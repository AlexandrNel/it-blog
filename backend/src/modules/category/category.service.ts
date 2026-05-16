import type { Role } from '@/generated/prisma/enums.js'
import { prisma } from '@/shared/lib/prisma.js'

export class CategoryService {
  private getRoleFilter(role?: Role) {
    if (role === 'USER' || !role) {
      return {
        NOT: { availableFor: { has: 'ADMIN' as Role } },
      }
    }
    return {}
  }
  async getAll(role?: Role) {
    const tags = await prisma.category.findMany({
      where: this.getRoleFilter(role),
      select: { id: true, key: true, value: true },
    })
    return tags
  }
}
