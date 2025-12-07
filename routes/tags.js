import express from "express";
import PostSchema from "../models/post.js";
import mongoose from "mongoose";
import { checkAuth } from "../middlewares/index.js";
const router = express.Router();
router.get("/tags", async (req, res) => {
  try {
    const posts = await PostSchema.find();
    const tags = posts.map((post) => {
      return post.tags[0];
    });

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Error",
    });
  }
});
router.get("/tags/:tag", async (req, res) => {
  try {
    const tag = req.params.tag.trim();
    const regex = new RegExp(tag, "i");
    const posts = await PostSchema.find({
      tags: { $regex: regex },
    }).populate({
      path: "user",
      select: ["fullName", "avatarUrl"],
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Статьи не найдены" });
  }
});

export default router;
