import express from 'express'
import { createPost, getAll, getById, getBySlug, getSomeByTag, deletePost, updatePost, likeOrDislikePost, getStatistic, } from '~/controllers/post.controller.js';
import { authMiddleware } from '~/middlewares/auth.middleware.js';
import { paginateMiddleware } from '~/middlewares/paginate.middleware.js';
import { withUserMiddleware } from '~/middlewares/user.middleware.js';

const router = express.Router();

router.get("/posts", paginateMiddleware, getAll);
router.get("/posts/id/:id", getById)
router.get("/posts/:slug", getBySlug)
router.get("/posts/tag/:tag", getSomeByTag)
router.get("/posts/:id/statistic", withUserMiddleware, getStatistic)

router.post("/posts", authMiddleware, createPost)
router.delete("/posts/:id", authMiddleware, deletePost)
router.patch("/posts/:id", authMiddleware, updatePost)
router.post("/posts/:id/like", authMiddleware, likeOrDislikePost)
router.post("/posts/:id/dislike", authMiddleware, likeOrDislikePost)

export default router