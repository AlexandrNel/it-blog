import express from 'express'
import cors from 'cors'
import {
  authRouter,
  categoryRouter,
  commentsRouter,
  followRouter,
  postRouter,
  profileRouter,
  tagRouter,
  uploadRouter,
  userRouter,
} from './modules/index.js'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middlewares/error.middleware.js'

const PORT = process.env.PORT || 3000
const app = express()
app.set('trust proxy', true)

app.use(
  express.json(),
  cookieParser(),
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)
app.use(
  '/api',
  authRouter,
  postRouter,
  commentsRouter,
  profileRouter,
  tagRouter,
  categoryRouter,
  userRouter,
  followRouter,
  uploadRouter,
)


app.use(errorMiddleware)

export function initServer() {
  const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
  return server
}
