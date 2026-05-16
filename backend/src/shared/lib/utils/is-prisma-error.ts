import { Prisma } from '../../../../generated/prisma/client.js'

export function isPrismaError(
  error: unknown
): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError
}

export function isPrismaValidationError(
  error: unknown
): error is Prisma.PrismaClientValidationError {
  return error instanceof Prisma.PrismaClientValidationError
}

export const PrismaErrorCode = {
  UNIQUE_CONSTRAINT: 'P2002',
  NOT_FOUND: 'P2025',
  FOREIGN_KEY: 'P2003',
} as const
