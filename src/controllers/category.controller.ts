import type { Request, Response } from 'express'
import { errorHandler } from '~/middlewares/errorHandler.js';
import { CategoryService } from '~/services/category.service.js';

const categoryService = new CategoryService()


export const getAll = async (req: Request, res: Response) => {
    try {
        const cats = await categoryService.getAll()
        res.json(cats);
    } catch (error) {
        errorHandler(error, res)
    }
};
