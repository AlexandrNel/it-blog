import type { Request, Response } from 'express'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { SeoService } from './seo.service.js'

const seoService = new SeoService()

export const getSitemapData = asyncHandler(
  async (_req: Request, res: Response) => {
    const data = await seoService.getSitemapData()
    res.status(200).json(data)
  }
)
