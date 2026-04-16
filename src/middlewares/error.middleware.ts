import type { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { ApiError } from '@/shared/lib/api-error.js'
import { RedisError } from '@/shared/lib/redis-error.js'
import { UploadError } from '@/shared/lib/upload-error.js'

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    res
      .status(err.statusCode)
      .json({ message: err.message, errors: err.errors })
  } else if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Неверно заполнены поля',
      errors: z.flattenError(err).fieldErrors,
    })
  } else if (err instanceof UploadError) {
    res.status(400).json({ message: err.message })
  } else if (err instanceof RedisError) {
    res.status(400).json({ message: err.message, ...err.body })
  } else {
    res.status(500).json({ message: 'Неизвестная ошибка' })
  }
  console.trace(err)
}

export { errorMiddleware }
