import express from "express";
import { tagController } from "~/controllers/index.js";


const router = express.Router();

router.get("/tags", tagController.getAll);


export default router;
