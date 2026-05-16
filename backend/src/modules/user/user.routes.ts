import express from 'express'
import {
  checkUsername,
  generateUsername,
  getMe,
  getSettings,
  updatePassword,
  updateUsername,
} from './user.controller.js'
import { authMiddleware } from '@/middlewares/auth.middleware.js'
import { withUserMiddleware } from '@/middlewares/user.middleware.js'

const router = express.Router()

// TODO: заменить auth на user (оставил, потому что перенес из модуля auth, на клиенте используется также "ручка" auth)
router.get('/auth/me', authMiddleware, getMe)
router.get('/auth/check', authMiddleware, getMe)

router.get('/users/check-username', withUserMiddleware, checkUsername)
router.get('/users/username/generate', generateUsername)
router.get('/users/settings', authMiddleware, getSettings)

router.put('/users/username', authMiddleware, updateUsername)
router.put('/users/password', authMiddleware, updatePassword)

export default router
