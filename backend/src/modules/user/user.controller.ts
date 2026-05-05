import type { Request, Response } from 'express'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { ApiError } from '@/shared/lib/api-error.js'
import { UserService } from '@/modules/user/user.service.js'
import { ProfileService } from '@/modules/profile/profile.service.js'
import { getUser } from '@/middlewares/auth.middleware.js'
import { UsernameSchema, UserUpdatePasswordSchema } from './user.validation.js'
import { requireUser } from '@/shared/helpers/request.helpers.js'

const userSerice = new UserService(new ProfileService())

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const userId = requireUser(req).id
  const user = await userSerice.getMe(userId)
  res.status(200).json(user)
})

export const generateUsername = asyncHandler(
  async (_req: Request, res: Response) => {
    const username = await userSerice.generateUniqueUsername()
    res.status(200).json({ username })
  }
)
export const checkUsername = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await UsernameSchema.parseAsync({
      username: req.query.username,
    })
    const data = await userSerice.usernameIsAvailable(undefined, {
      username: result.username,
    })
    if (!data.isAvailable) throw ApiError.BadRequest('Никнейм занят')
    res.status(204).send()
  }
)

export const getSettings = asyncHandler(async (req, res) => {
  const id = req.user?.id
  if (!id) throw ApiError.BadRequest('Не передан ID')
  const settings = await userSerice.getSettingsByUserId(id)
  res.status(200).json(settings)
})

export const updateUsername = asyncHandler(async (req, res) => {
  const user = getUser(req)
  const result = await UsernameSchema.parseAsync(req.body)
  await userSerice.updateUsername(result.username, user.id)
  res.status(204).send()
})
export const updatePassword = asyncHandler(async (req, res) => {
  const user = getUser(req)
  const result = await UserUpdatePasswordSchema.parseAsync(req.body)
  await userSerice.updatePassword(
    result.oldPassword,
    result.newPassword,
    user.id
  )
  res.status(204).send()
})
