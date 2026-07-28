import { Router } from 'express'
import {
  login,
  logout,
  register,
  resfreshToken,
  demoLogin,
} from './auth.controller.js'
import { withUserMiddleware } from '@/middlewares/user.middleware.js'
import rateLimit from 'express-rate-limit'

const router = Router()

export const mutationLimiter = rateLimit({
  windowMs: 20000, // 20 секунд
  limit: 1,
  message: { message: 'Слишком много запросов. Пожалуйста, попробуйте позже' },
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/logout', logout)
router.post('/auth/refresh', resfreshToken)
router.post('/auth/demo', mutationLimiter, withUserMiddleware, demoLogin)

export default router
