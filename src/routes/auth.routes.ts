// src/routes/auth.routes.js
import { Router } from "express";
import { getMe, login, register } from "~/controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/auth/me", authMiddleware, getMe);
router.post("/auth/register", register);
router.post("/auth/login", login)

export default router;