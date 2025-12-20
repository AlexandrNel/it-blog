import express from 'express'
import { getAll, getById } from '~/controllers/post.controller.js';

const router = express.Router();

router.get("/posts", getAll);
router.get("/posts/id/:id", getById)

export default router