import type { Request, Response } from 'express'
import { errorHandler } from '~/middlewares/errorHandler.js';
import { TagService } from '~/services/tag.service.js';

const tagService = new TagService()


export const getAll = async (req: Request, res: Response) => {
    try {
        const tags = await tagService.getAll()
        res.json(tags);
    } catch (error) {
        errorHandler(error, res)
    }
};
