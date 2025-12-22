
import type { Request, Response } from 'express'
import { validatePostSchema } from '~/dto/post.dto.js';
import { AppError } from '~/lib/errors/AppError.js';
import { NotFoundError } from '~/lib/errors/index.js';
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

export const getBySlug = async (req: Request, res: Response) => {
    try {
        const params = req.params
        const slug = params.slug
        if (!slug) throw new NotFoundError()
        const post = await postService.getBySlug(slug)
        if (!post) throw new NotFoundError("Статья не найдена")
        res.json(post);
    } catch (error) {
        errorHandler(error, res)
    }
};
export const getSomeByTag = async (req: Request, res: Response) => {
    try {
        const params = req.params
        const tag = params.tag
        if (!tag) throw new NotFoundError()
        const posts = await postService.getAllByTag(tag)
        if (!posts) throw new NotFoundError("Статьи не найдены")
        res.json(posts);
    } catch (error) {
        errorHandler(error, res)
    }
};
export const createPost = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string
        const data = await validatePostSchema({ ...req.body, authorId: userId })
        const post = await postService.create(data)
        res.json(post);
    } catch (error) {
        errorHandler(error, res)
    }
};
export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) throw new AppError("Не передан id статьи")
        await postService.delete(id)
        res.json().status(200)
    } catch (error) {
        errorHandler(error, res)
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id as string
        const id = req.params.id
        const data = req.body
        if (!id) throw new AppError("Не передан id статьи")
        const post = await postService.update({ authorId: userId, postId: id, ...data })
        res.json(post).status(200)
    } catch (error) {
        errorHandler(error, res)
    }
};


