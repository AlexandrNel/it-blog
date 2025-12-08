// src/routes/auth.routes.js
import { Router } from "express";
import { getMe } from "~/controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/auth/me", authMiddleware, getMe);

export default router;