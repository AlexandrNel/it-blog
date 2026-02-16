import type { Request, Response } from 'express'
import { TagService } from '~/services/tag.service.js';
import { asyncHandler } from '~/shared/helpers/asyncHandler.js';

const tagService = new TagService()


export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const tags = await tagService.getAll()
    res.json(tags);
});
