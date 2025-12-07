import express from "express";
import multer from "multer";
import { checkAuth } from "../middlewares/checkAuth.js";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.use("/uploads", express.static("uploads"));

router.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

export default router;
