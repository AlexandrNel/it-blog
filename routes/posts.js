import express from "express";
import { handleValidationErrors, checkAuth } from "../middlewares/index.js";
import { createPostValidation } from "../utils/validations.js";
import { PostController } from "../controllers/index.js";
const router = express.Router();

router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getOne);
router.get("/posts/:id/comments", PostController.getComments);
router.post(
  "/posts",
  checkAuth,
  createPostValidation,
  handleValidationErrors,
  PostController.create
);
router.patch(
  "/posts/:id",
  checkAuth,
  createPostValidation,
  handleValidationErrors,
  PostController.update
);

export default router;
