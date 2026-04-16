import { Router } from 'express'
import { login, logout, register, resfreshToken } from './auth.controller.js'

const router = Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/logout', logout)
router.post('/auth/refresh', resfreshToken)

export default router
