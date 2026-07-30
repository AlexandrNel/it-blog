import express from 'express'
import { getAll } from './category.controller.js'
import { withUserMiddleware } from '@/middlewares/user.middleware.js'

const router = express.Router()

router.get('/categories', withUserMiddleware, getAll)

export default router
