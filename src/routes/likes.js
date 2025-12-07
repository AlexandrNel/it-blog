import express from "express";
import { checkAuth } from "../src/middlewares/index.js";
import { LikeContoller } from "../src/controllers/index.js";
const router = express.Router();
router.get("/like/:id", checkAuth, LikeContoller.checkIsLiked);
router.post("/like/:id", checkAuth, LikeContoller.addLike);
router.delete("/like/:id", checkAuth, LikeContoller.removeLike);

export default router;
