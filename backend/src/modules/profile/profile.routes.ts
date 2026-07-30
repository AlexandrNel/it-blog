import express from 'express'
import { authMiddleware } from '@/middlewares/auth.middleware.js'
import { paginateMiddleware } from '@/middlewares/paginate.middleware.js'
import {
  getProfileByUserId,
  getProfileConnectionsPage,
  getProfileConnectionsSummary,
  getProfileMetaByUserId,
  getProfileStatisticByUserId,
  updateProfile,
} from '@/modules/profile/profile.controller.js'
import { withUserMiddleware } from '@/middlewares/user.middleware.js'

const router = express.Router()

router.get('/profile/:id/statistic', getProfileStatisticByUserId)
router.get('/profile/:id/meta', withUserMiddleware, getProfileMetaByUserId)
router.get('/profile/:id/connections/summary', getProfileConnectionsSummary)
router.get(
  '/profile/:id/connections/:kind',
  paginateMiddleware,
  getProfileConnectionsPage
)
router.get('/profile/:id', withUserMiddleware, getProfileByUserId)
router.patch('/profile', authMiddleware, updateProfile)

export default router
