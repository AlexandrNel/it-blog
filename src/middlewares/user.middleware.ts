import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from "~/shared/utils/jwt.js";


export const withUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.cookies.access_token
    if (token) {
        const payload = verifyToken(token)
        if (payload) {
            req.user = payload
        }
    }
    next()
};
