import express from "express";
import {
  checkNickname,
  generateNickname,
} from "~/controllers/user.controller.js";

const router = express.Router();

router.get("/users/check-nickname", checkNickname);
router.get("/users/nickname/generate", generateNickname);

export default router;
