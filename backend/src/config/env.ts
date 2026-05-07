import { z } from "zod"
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().optional().default(3000),
  PUBLIC_URL: z.url(),
  CORS_ORIGIN: z.url().optional(),

  DATABASE_URL: z.string(),

  JWT_SECRET: z
    .string()
    .min(64, 'JWT_SECRET должен быть минимум 64 символа (128 hex)'),
  REFRESH_SECRET: z.string().min(64),

  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379)

})

export const env = envSchema.parse(process.env)
