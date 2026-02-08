// src/routes/auth.routes.js
import { Router } from "express";
import { getMe, login, logout, register, check, resfreshToken } from "~/controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/auth/me", authMiddleware, getMe);
router.get("/auth/check", check);
router.post("/auth/register", register);
router.post("/auth/login", login)
router.post("/auth/logout", logout)
router.post("/auth/refresh", resfreshToken)

export default router;