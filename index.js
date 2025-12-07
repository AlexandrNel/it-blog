import express from "express";
import cors from "cors";
import "dotenv/config";

import {
  authRouter,
  commentsRouter,
  postRouter,
  uploadRouter,
  tagsRouter,
  likesRouter,
} from "./routes/index.js";

const PORT = process.env.PORT;
const app = express();

app.use(
  express.json(),
  cors(),
  uploadRouter,
  authRouter,
  postRouter,
  commentsRouter,
  tagsRouter,
  likesRouter
);

app.listen(PORT, (err) => (err ? console.log(err) : console.log("Server OK")));
