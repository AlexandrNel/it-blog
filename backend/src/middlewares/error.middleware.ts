import type { NextFunction, Request, Response } from 'express'
import { ZodError, z } from 'zod'
import { ApiError } from '@/shared/lib/api-error.js'
import { RedisError } from '@/shared/lib/redis-error.js'
import { UploadError } from '@/shared/lib/upload-error.js'

const ERROR_CODES = {
  API_ERROR: 'API_ERROR',
  UPLOAD_ERROR: 'UPLOAD_ERROR',
  REDIS_ERROR: 'REDIS_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
} as const

type ErrorType = ApiError | ZodError | UploadError | RedisError

const errorMiddleware = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
      code: ERROR_CODES.API_ERROR,
    })
  } else if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Неверно заполнены поля',
      errors: z.flattenError(err).fieldErrors,
      code: ERROR_CODES.VALIDATION_FAILED,
    })
  } else if (err instanceof UploadError) {
    res
      .status(400)
      .json({ message: err.message, code: ERROR_CODES.UPLOAD_ERROR })
  } else if (err instanceof RedisError) {
    res.status(400).json({
      message: err.message,
      code: ERROR_CODES.REDIS_ERROR,
      ...err.body,
    })
  } else {
    res
      .status(500)
      .json({ message: 'Неизвестная ошибка', code: ERROR_CODES.UNKNOWN_ERROR })
  }
  console.trace(err)
}

export { errorMiddleware }
