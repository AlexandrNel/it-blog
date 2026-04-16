import express from 'express'
import { getAll, getPopular } from './tag.controller.js'
import { withUserMiddleware } from '@/middlewares/user.middleware.js'

const router = express.Router()

router.get('/tags', withUserMiddleware, getAll)
router.get('/tags/popular', withUserMiddleware, getPopular)

export default router
