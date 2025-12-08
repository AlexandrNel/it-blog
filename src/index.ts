import express from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  express.json(),
  cors()
  // uploadRouter,
  // authRouter
  // postRouter,
  // commentsRouter,
  // tagsRouter,
  // likesRouter
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})

