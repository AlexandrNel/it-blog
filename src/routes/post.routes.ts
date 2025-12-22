import express from 'express'
import { createPost, getAll, getById, getBySlug, getSomeByTag, deletePost, updatePost, } from '~/controllers/post.controller.js';
import { authMiddleware } from '~/middlewares/auth.middleware.js';

const router = express.Router();

router.get("/posts", getAll);
router.get("/posts/id/:id", getById)
router.get("/posts/:slug", getBySlug)
router.get("/posts/tag/:tag", getSomeByTag)

router.post("/posts", authMiddleware, createPost)
router.delete("/posts/:id", authMiddleware, deletePost)
router.patch("/posts/:id", authMiddleware, updatePost)

export default router