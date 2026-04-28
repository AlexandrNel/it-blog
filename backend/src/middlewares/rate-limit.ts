import rateLimit from 'express-rate-limit'

export const mutationLimiter = rateLimit({
  windowMs: 20000, // 20 секунд
  limit: 10,
  message: { message: 'Слишком много запросов. Пожалуйста, попробуйте позже' },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

export const deleteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { message: 'Слишком много запросов' },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  limit: 30,
  message: { message: 'Превышен лимит загрузки изображений' },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})