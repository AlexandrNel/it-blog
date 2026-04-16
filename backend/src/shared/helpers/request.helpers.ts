import type { Request } from 'express'
import { ApiError } from '@/shared/lib/api-error.js'

export function requireParam(
  req: Request,
  key: string,
  message: string
): string {
  const value = req.params[key]
  if (!value) throw ApiError.NotFoundError(message)
  return value
}

export function requireUser(req: Request) {
  if (!req.user) throw ApiError.ForbiddenError('Пользователь не авторизован')
  return req.user
}
