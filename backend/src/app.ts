import express from 'express'
import cors from 'cors'
import {
  authRouter,
  categoryRouter,
  commentsRouter,
  followRouter,
  postRouter,
  profileRouter,
  seoRouter,
  tagRouter,
  uploadRouter,
  userRouter,
} from './modules/index.js'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { config } from './config/index.js'

const app = express()

app.set('trust proxy', true)

app.use(
  express.json(),
  cookieParser(),
  cors({
    origin: config.corsOrigin,
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
  seoRouter,
  tagRouter,
  categoryRouter,
  userRouter,
  followRouter,
  uploadRouter
)

app.use(errorMiddleware)

export function initServer() {
  const server = app.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`)
  })
  return server
}
