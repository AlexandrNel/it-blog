import type { Request, Response } from 'express'
import { CategoryService } from './category.service.js'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { getUserSafe } from '@/middlewares/user.middleware.js'

const categoryService = new CategoryService()

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const user = getUserSafe(req)
  const cats = await categoryService.getAll(user?.role)
  res.json(cats)
})
