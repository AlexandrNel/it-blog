import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from "~/utils/jwt.js";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.cookies.access_token

    if (!token) {
        return res.status(403).json({
            message: "Нет доступа",
        });
    }
    const payload = verifyToken(token)

    if (!payload) {
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')
        return res.status(403).json({
            message: "Токен не действителен",
        });
    }

    req.user = payload
    next()
};
