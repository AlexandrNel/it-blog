import express from "express";
import cors from "cors";
import { authRouter, postRouter, tagRouter } from './routes/index.js'
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;
const app = express();
app.set('trust proxy', true)

app.use(
    express.json(),
    cookieParser(),
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }),
);
app.use('/api',
    authRouter,
    postRouter,
    tagRouter
)

export function initServer() {
    const server = app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    })
    return server
}