import express from "express";
import cors from "cors";
import { authRouter } from './routes/index.js'
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  express.json(),
  cookieParser(),
  cors(),
);
app.use('/api',
  authRouter,
)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})

