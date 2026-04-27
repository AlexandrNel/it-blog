import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3000),
  APP_URL: z.url(),

  DATABASE_URL: z.string(),

  JWT_SECRET: z
    .string()
    .min(64, 'JWT_SECRET должен быть минимум 64 символа (128 hex)'),
  REFRESH_SECRET: z.string().min(64),
})

export const env = envSchema.parse(process.env)
