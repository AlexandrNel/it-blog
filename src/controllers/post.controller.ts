import type { Request, Response } from "express";
import {
    type PaginatedPostsResponseDto,
    type PostDetailDto,
    type PostListItemDto,
    type PostStatisticResponseDto,
    validateCreatePost,
} from "~/dto/post.dto.js";
import { NotFoundError, ValidationError } from "~/lib/errors/index.js";
import { errorHandler } from "~/middlewares/errorHandler.js";
import type { PaginationParams } from "~/middlewares/paginate.middleware.js";
import { PostService } from "~/services/post.service.js";

const postService = new PostService();

// ─── Param helpers ───────────────────────────────────────────────────────────

function getParamId(req: Request): string {
    const id = req.params.id;
    if (!id) throw new ValidationError("Не передан id статьи");
    return id;
}

function getParamSlug(req: Request): string {
    const slug = req.params.slug;
    if (!slug) throw new NotFoundError("Не указан slug");
    return slug;
}

function getParamTag(req: Request): string {
    const tag = req.params.tag;
    if (!tag) throw new NotFoundError("Не указан тег");
    return tag;
}

function getUserId(req: Request): string {
    const id = req.user?.id;
    if (!id) throw new ValidationError("Пользователь не авторизован");
    return id;
}

// ─── Handlers ────────────────────────────────────────────────────────────────

export const getAll = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.pagination as PaginationParams;
        const result = await postService.getAllWithPages(Number(limit), Number(page));
        res.json(result as PaginatedPostsResponseDto);
    } catch (error) {
        errorHandler(error, res);
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const id = getParamId(req);
        const post = await postService.getById(id);
        if (!post) throw new NotFoundError("Статья не найдена");
        res.json(post as PostDetailDto);
    } catch (error) {
        errorHandler(error, res);
    }
};

export const getBySlug = async (req: Request, res: Response) => {
    try {
        const slug = getParamSlug(req);
        const post = await postService.getBySlug(slug);
        if (!post) throw new NotFoundError("Статья не найдена");
        res.json(post as PostDetailDto);
    } catch (error) {
        errorHandler(error, res);
    }
};

export const getSomeByTag = async (req: Request, res: Response) => {
    try {
        const tag = getParamTag(req);
        const posts = await postService.getAllByTag(tag);
        res.json(posts as PostDetailDto[]);
    } catch (error) {
        errorHandler(error, res);
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const userId = getUserId(req);
        const data = await validateCreatePost({ ...req.body, authorId: userId });
        const post = await postService.create(data);
        res.status(201).json(post);
    } catch (error) {
        errorHandler(error, res);
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = getParamId(req);
        await postService.delete(id);
        res.status(200).json({ success: true });
    } catch (error) {
        errorHandler(error, res);
    }
};

export const getStatistic = async (req: Request, res: Response) => {
    try {
        const id = getParamId(req);
        const stats = await postService.getStatistic(id, req.user?.id);
        if (!stats) throw new NotFoundError("Статья не найдена");
        res.status(200).json(stats as PostStatisticResponseDto);
    } catch (error) {
        errorHandler(error, res);
    }
};

export const likeOrDislikePost = async (req: Request, res: Response) => {
    try {
        const isLike = req.path.endsWith("/like");
        const userId = getUserId(req);
        const postId = getParamId(req);
        const value = isLike ? 1 : -1;
        await postService.likeOrDislike(userId, postId, value);
        res.status(200).send();
    } catch (error) {
        errorHandler(error, res);
    }
};

export const incrementView = async (req: Request, res: Response) => {
    try {
        const canUpdate = req.updateView;
        const id = getParamId(req);
        if (!canUpdate) throw new ValidationError("Пользователь уже просматривал эту статью");
        await postService.updateViews(id);
        res.status(200).send();
    } catch (error) {
        errorHandler(error, res);
    }
};
