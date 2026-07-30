import { hash } from 'crypto'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { getRedis } from '@/shared/redis/client.js'
import { ApiError } from '@/shared/lib/api-error.js'
import type { Request } from 'express'

export const demoMiddleware = asyncHandler(async (req, res, next) => {
  next()
})
