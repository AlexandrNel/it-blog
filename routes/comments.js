import express from "express";
import { checkAuth } from "../middlewares/index.js";
import { CommentController } from "../controllers/index.js";
const router = express.Router();
router.post("/comments", checkAuth, CommentController.createComment);
router.delete("/comments/:id", checkAuth, CommentController.deleteComment);
router.put("/comments/:id", checkAuth, CommentController.updateComment);
export default router;
