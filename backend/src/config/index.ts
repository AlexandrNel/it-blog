import { env } from './env.js'

export const config = {
  isProduction: env.NODE_ENV === 'production',
  port: env.PORT,
  publicUrl: env.PUBLIC_URL,
  corsOrigin: env.CORS_ORIGIN ?? env.PUBLIC_URL,
  databaseUrl: env.DATABASE_URL,
  redisHost: env.REDIS_HOST,
  redisPort: env.REDIS_PORT,
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '1d',
  },
  refresh: {
    secret: env.REFRESH_SECRET,
    expiresIn: '30d',
  },
} as const
console.log(config);
