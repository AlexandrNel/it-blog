import { env } from '@/config/env.js'
import { Redis } from 'ioredis'
let redis: Redis | null = null

export const initRedis = () => {
  if (!redis) {
    redis = new Redis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT
    })
      .on('ready', () => {
        console.log('Redis ready')
      })
      .on('error', (err) => {
        console.log(err.stack)
      })
  }
  return redis
}

export const getRedis = () => {
  if (!redis) {
    throw new Error('Redis not initialized')
  }
  return redis
}
