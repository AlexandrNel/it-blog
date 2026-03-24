import express from "express";
import {
  checkUsername,
  generateUsername,
  getSettings,
  updatePassword,
  updateUsername,
} from "~/controllers/user.controller.js";
import { authMiddleware } from "~/middlewares/auth.middleware.js";
import { withUserMiddleware } from "~/middlewares/user.middleware.js";

const router = express.Router();

router.get("/users/check-username", withUserMiddleware, checkUsername);
router.get("/users/username/generate", generateUsername);
router.get("/users/settings", authMiddleware, getSettings);

router.put("/users/username", authMiddleware, updateUsername);
router.put("/users/password", authMiddleware, updatePassword);

export default router;
