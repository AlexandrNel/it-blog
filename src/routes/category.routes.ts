import express from "express";
import { categoryController } from "~/controllers/index.js";


const router = express.Router();

router.get("/categories", categoryController.getAll);


export default router;
