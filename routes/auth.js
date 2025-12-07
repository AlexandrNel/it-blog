import express from "express";
import { handleValidationErrors, checkAuth } from "../middlewares/index.js";
import { registerValidation } from "../utils/validations.js";
import { authController } from "../controllers/index.js";
const router = express.Router();

router.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  authController.register
);
router.post("/auth/login", authController.login);
router.get("/auth/me", checkAuth, authController.getMe);

export default router;
