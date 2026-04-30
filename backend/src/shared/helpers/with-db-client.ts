import type { Prisma } from '../../../generated/prisma/client.js'
import { prisma } from '@/shared/lib/prisma.js'

export type DbClient = typeof prisma | Prisma.TransactionClient

export function withClient<T extends unknown[], TResult>(
  func: (client: DbClient, ...args: T) => Promise<TResult>
): (client?: DbClient, ...args: T) => Promise<TResult>

export function withClient<TResult>(
  func: (client: DbClient) => Promise<TResult>
): (client?: DbClient) => Promise<TResult>

export function withClient<T extends unknown[], TResult>(
  func: (client: DbClient, ...args: T) => Promise<TResult>
) {
  return function (client?: DbClient, ...args: T) {
    const prismaClient = client ?? prisma
    return func(prismaClient, ...args)
  }
}
