import type { Request, Response } from "express";
import { updatePostSchema } from "~/dto/post-request.dto.js";
import type { PostFullDto } from "~/dto/post-response.dto.js";
import {
    type PaginatedPostsResponseDto,
    type PostPreviewDto,
    type PostStatisticResponseDto,
    validateCreatePost,
} from "~/dto/post.dto.js";
import { ApiError } from "~/shared/lib/api-error.js";
import type { PaginationParams } from "~/middlewares/paginate.middleware.js";
import { PostService } from "~/services/post.service.js";
import { asyncHandler } from "~/shared/helpers/asyncHandler.js";

const postService = new PostService();

// ─── Param helpers ───────────────────────────────────────────────────────────

function getParamId(req: Request): string {
    const id = req.params.id;
    if (!id) throw ApiError.NotFoundError("Не передан id статьи");
    return id;
}

function getParamSlug(req: Request): string {
    const slug = req.params.slug;
    if (!slug) throw ApiError.NotFoundError("Не указан slug");
    return slug;
}

function getParamTag(req: Request): string {
    const tag = req.params.tag;
    if (!tag) throw ApiError.NotFoundError("Не указан тег");
    return tag;
}

function getUserId(req: Request): string {
    const id = req.user?.id;
    if (!id) throw ApiError.BadRequest("Пользователь не авторизован");
    return id;
}

// ─── Handlers ────────────────────────────────────────────────────────────────

export const getAll = asyncHandler(async (req: Request, res: Response) => {
    const { page, limit } = req.pagination as PaginationParams;
    const result = await postService.getAllWithPages(Number(limit), Number(page));
    res.json(result as PaginatedPostsResponseDto);
})

export const getById = asyncHandler(async (req: Request, res: Response) => {
    const id = getParamId(req);
    const post = await postService.getById(id);
    res.json(post as PostFullDto);
});

export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
    const slug = getParamSlug(req);
    const post = await postService.getBySlug(slug);
    res.json(post as PostFullDto);
});

export const getSomeByTag = asyncHandler(async (req: Request, res: Response) => {
    const tag = getParamTag(req);
    const posts = await postService.getAllByTag(tag);
    res.json(posts as PostPreviewDto[]);
});

export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const data = await validateCreatePost({ ...req.body, authorId: userId });
    const post = await postService.create(data);
    res.status(201).json(post);
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const id = getParamId(req)
    const data = await updatePostSchema.parseAsync(req.body)
    const post = await postService.update(data, id, userId);
    res.status(201).json(post);
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const id = getParamId(req);
    await postService.delete(id, userId);
    res.status(200).json({ success: true });
});

export const getStatistic = asyncHandler(async (req: Request, res: Response) => {
    const id = getParamId(req);
    const stats = await postService.getStatistic(id, req.user?.id);
    res.status(200).json(stats as PostStatisticResponseDto);
});

export const likeOrDislikePost = asyncHandler(async (req: Request, res: Response) => {
    const isLike = req.path.endsWith("/like");
    const userId = getUserId(req);
    const postId = getParamId(req);
    const value = isLike ? 1 : -1;
    await postService.likeOrDislike(userId, postId, value);
    res.status(204).json()
});

export const incrementView = asyncHandler(async (req: Request, res: Response) => {
    const canUpdate = req.updateView;
    const id = getParamId(req);
    if (!canUpdate) throw ApiError.BadRequest("Пользователь уже просматривал эту статью");
    await postService.updateViews(id);
    res.status(204).json()
});
