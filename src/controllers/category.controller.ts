import type { Request, Response } from 'express'
import { CategoryService } from '~/services/category.service.js';
import { asyncHandler } from '~/shared/helpers/asyncHandler.js';

const categoryService = new CategoryService()

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const cats = await categoryService.getAll()
    res.json(cats);
});
