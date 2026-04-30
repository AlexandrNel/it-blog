import type { Prisma } from '../../../generated/prisma/client.js'
import { prisma } from '@/shared/lib/prisma.js'

export type DbClient = typeof prisma | Prisma.TransactionClient

export class BaseRepository {
  protected transaction<T>(
    fn: (tx: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    return prisma.$transaction(fn)
  }
}
