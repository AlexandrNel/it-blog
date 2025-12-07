import express from "express";
import { checkAuth } from "../middlewares/index.js";
import { LikeContoller } from "../controllers/index.js";
const router = express.Router();
router.get("/like/:id", checkAuth, LikeContoller.checkIsLiked);
router.post("/like/:id", checkAuth, LikeContoller.addLike);
router.delete("/like/:id", checkAuth, LikeContoller.removeLike);

export default router;
