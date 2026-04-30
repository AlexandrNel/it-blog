import { env } from './env.js'

export const config = {
  port: env.PORT,
  appUrl: env.APP_URL,
  databaseUrl: env.DATABASE_URL,
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '1d',
  },
  refresh: {
    secret: env.REFRESH_SECRET,
    expiresIn: '30d',
  },
} as const
