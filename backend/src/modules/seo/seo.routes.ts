import express from 'express'
import { getSitemapData } from './seo.controller.js'

const router = express.Router()

router.get('/seo/sitemap', getSitemapData)

export default router
