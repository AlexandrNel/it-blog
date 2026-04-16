import { AuthService } from './auth.service.js'
import type { Response, Request, CookieOptions } from 'express'
import { registerSchema } from './auth.dto.js'
import { refreshToken } from '@/shared/lib/utils/jwt.js'
import { ApiError } from '@/shared/lib/api-error.js'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { UserService } from '../user/user.service.js'
import { ProfileService } from '../profile/profile.service.js'

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false, // must be true in prodaction!
  sameSite: 'lax',
  path: '/',
  domain: 'localhost',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
}

const authService = new AuthService(new UserService(new ProfileService()))

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await registerSchema.parseAsync(req.body)
  const { user, token } = await authService.register(data)
  res.cookie('access_token', token, cookieOptions)
  res.status(201).json(user)
})
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { user, token, refresh } = await authService.login(req.body)
  res.cookie('access_token', token, cookieOptions)
  res.cookie('refresh_token', refresh, cookieOptions)
  res.json(user)
})
export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie('access_token')
  res.clearCookie('refresh_token')
  res.status(200).json()
})
export const resfreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refresh: string | undefined = req.cookies.refresh_token
    if (!refresh) throw ApiError.ForbiddenError()
    const jwt = refreshToken(refresh)
    if (!jwt) {
      res.clearCookie('refresh_token')
      res.clearCookie('access_token')
      throw ApiError.UnauthorizedError()
    }
    res.cookie('access_token', jwt, cookieOptions)
    res.json()
  }
)
