import type { Request, Response } from 'express'
import { getUserSafe } from '@/middlewares/user.middleware.js'
import { TagService } from './tag.service.js'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { ApiError } from '@/shared/lib/api-error.js'

const tagService = new TagService()

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const user = getUserSafe(req)
  const tags = await tagService.getAll(user?.role)
  res.json(tags)
})
export const getPopular = asyncHandler(async (req: Request, res: Response) => {
  const user = getUserSafe(req)
  const tags = await tagService.getPopular(5, user?.role)
  res.json(tags)
})
