import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/shared/lib/api-error.js'
import { verifyToken } from '@/shared/lib/utils/jwt.js'

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers.authorization
  const cookieToken: string | undefined = req.cookies?.access_token

  let accessToken: string | undefined

  if (authHeader) {
    const [scheme, token] = authHeader.split(' ')
    if (scheme?.toLowerCase() === 'bearer' && token) {
      accessToken = token
    }
  }

  if (!accessToken && cookieToken) {
    accessToken = cookieToken
  }

  if (accessToken) {
    const payload = verifyToken(accessToken)

    if (!payload) {
      throw ApiError.UnauthorizedError('Токен не действителен')
    }
    req.user = payload
    return next()
  } else {
    throw ApiError.UnauthorizedError()
  }
}

export function getUser(req: Request) {
  const user = req.user
  if (!user) throw ApiError.BadRequest('Пользователь не авторизован')
  return user
}
