import { hash } from 'crypto'
import type { Request, Response, NextFunction } from 'express'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { RedisError } from '@/shared/lib/redis-error.js'
import { getRedis } from '@/shared/redis/client.js'

export type PaginationParams = {
  page: number
  limit: number
}
export const postViewsMiddleware = asyncHandler(async (req, res, next) => {
  const redis = getRedis()
  const ip = req.ip
  const id = req.params.id
  if (!id) {
    return next()
  }
  const userAgent = req.headers['user-agent'] || ''
  const key = `post:${id}:view:${hash('sha256', ip + userAgent.slice(0, 30))}`
  const exists = await redis.exists(key)

  if (!exists) {
    const ttl = 24 * 60 * 60
    await redis.set(key, 1, 'EX', 24 * 60 * 60) // 1 день TTL
    req.updateView = { ttl }
  } else {
    const ttl = await redis.ttl(key)
    throw RedisError.ExistCacheError('', ttl)
  }
  next()
})
