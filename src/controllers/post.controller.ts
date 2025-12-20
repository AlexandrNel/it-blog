import type { Request, Response } from 'express'
import { NotFoundError } from '~/lib/errors/index.js';
import { prisma } from '~/lib/prisma.js';
import { errorHandler } from '~/middlewares/errorHandler.js';
import { PostService } from '~/services/post.service.js';

const postService = new PostService()

export const getAll = async (req: Request, res: Response) => {
    try {
        const posts = await postService.getAll()
        res.json(posts);
    } catch (error) {
        errorHandler(error, res)
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const params = req.params
        const id = params.id
        if (!id) throw new NotFoundError()
        const posts = await postService.getById(id)
        res.json(posts);
    } catch (error) {
        errorHandler(error, res)
    }
};