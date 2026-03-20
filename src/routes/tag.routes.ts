import express from "express";
import { tagController } from "~/controllers/index.js";
import { withUserMiddleware } from "~/middlewares/user.middleware.js";

const router = express.Router();

router.get("/tags", withUserMiddleware, tagController.getAll);
router.get("/tags/popular", withUserMiddleware, tagController.getPopular);

export default router;
