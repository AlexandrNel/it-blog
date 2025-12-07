import express from "express";
import { checkAuth } from "../src/middlewares/index.js";
import { CommentController } from "../src/controllers/index.js";
const router = express.Router();
router.post("/comments", checkAuth, CommentController.createComment);
router.delete("/comments/:id", checkAuth, CommentController.deleteComment);
router.put("/comments/:id", checkAuth, CommentController.updateComment);
export default router;
