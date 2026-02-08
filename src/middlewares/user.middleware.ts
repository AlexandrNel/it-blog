import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from "~/utils/jwt.js";


export const withUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.cookies.access_token
    let user
    if (token) {
        const payload = verifyToken(token)
        if (payload) {
            user = payload
        }
    }

    req.user = user
    next()
};
