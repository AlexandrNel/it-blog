import { AuthService } from './auth.service.js'
import type { Response, Request, CookieOptions } from 'express'
import { registerSchema } from './auth.dto.js'
import { refreshToken } from '@/shared/lib/utils/jwt.js'
import { ApiError } from '@/shared/lib/api-error.js'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { UserService } from '../user/user.service.js'
import { ProfileService } from '../profile/profile.service.js'
import { config } from '@/config/index.js'
import { getUserSafe } from '@/middlewares/user.middleware.js'

const baseCookieOptions: CookieOptions = {
  httpOnly: config.isProduction,
  secure: config.isProduction,
  sameSite: 'lax',
  path: '/',
}

const cookieOptions: CookieOptions = {
  ...baseCookieOptions,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
}

const authService = new AuthService(new UserService(new ProfileService()))

export const register = asyncHandler(async (req: Request, res: Response) => {
  const data = await registerSchema.parseAsync(req.body)
  const { token, refresh } = await authService.register(data)
  res.cookie('refresh_token', refresh, cookieOptions)
  res.cookie('access_token', token, cookieOptions)
  res.status(200).json({ message: 'Успешная регистрация' })
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { token, refresh } = await authService.login(req.body)
  res.cookie('refresh_token', refresh, cookieOptions)
  res.cookie('access_token', token, cookieOptions)
  res.json({ message: 'Успешная авторзация', token })
})

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie('refresh_token', baseCookieOptions)
  res.clearCookie('access_token', baseCookieOptions)
  res.status(200).json({ message: 'Успешный выход' })
})

export const resfreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refresh: string | undefined = req.cookies.refresh_token
    if (!refresh) throw ApiError.UnauthorizedError()
    const jwt = refreshToken(refresh)
    if (!jwt) {
      res.clearCookie('refresh_token', baseCookieOptions)
      res.clearCookie('access_token', baseCookieOptions)
      throw ApiError.UnauthorizedError()
    }
    res.cookie('access_token', jwt, cookieOptions)
    res.status(200).json({ message: 'Получен новый токен', token: jwt })
  }
)

export const demoLogin = asyncHandler(async (req, res) => {
  const payload = getUserSafe(req)
  if (payload) {
    throw new ApiError('Сначала выйдите, чтобы создать демо аккаунт', 409)
  }
  const { user, token, refresh } = await authService.demoLogin()
  res.cookie('refresh_token', refresh, cookieOptions)
  res.cookie('access_token', token, cookieOptions)
  res
    .status(200)
    .json({ message: 'Вы успешно вошли в демо аккаунт', user: user })
})
