import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@/shared/lib/utils/jwt.js'

export const withUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.cookies.access_token
  if (token) {
    const payload = verifyToken(token)
    if (payload) {
      req.user = payload
    }
  }
  next()
}

export function getUserSafe(req: Request) {
  return req.user
}
