import { errorHandler } from "~/middlewares/errorHandler.js";
import { AuthService } from "../services/auth.service.js"
import type { Response, Request, CookieOptions } from 'express'
import type { AuthenticatedRequest } from "~/types/express.js";
import { loginSchema, registerSchema } from "~/dto/auth.dto.js";
import { verifyToken } from "~/utils/jwt.js";
import { UnauthorizedError } from "~/lib/errors/index.js";


const authService = new AuthService()
const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false, // must be true in prodaction!
    sameSite: "lax",
    path: "/",
    domain: "localhost",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = (req as unknown as AuthenticatedRequest).user.id
        const user = await authService.getMe(userId);
        res.status(200).json(user);
    } catch (error) {
        errorHandler(error, res)
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const data = await registerSchema.parseAsync(req.body)
        const { user, token } = await authService.register(data)
        res.cookie('access_token', token, cookieOptions)
        res.status(201).json(user);
    } catch (error) {
        errorHandler(error, res)
    }
};
export const login = async (req: Request, res: Response) => {
    try {
        const data = await loginSchema.parseAsync(req.body)
        const { user, token } = await authService.login(data)
        res.cookie('access_token', token, cookieOptions)
        res.json(user);
    } catch (error) {
        errorHandler(error, res)
    }
};
export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('access_token')
        res.clearCookie('refresh_token')
        res.status(200).json()
    } catch (error) {
        errorHandler(error, res)
    }


};
export const check = async (req: Request, res: Response) => {
    try {
        const token: string | undefined = req.cookies.access_token
        if (!token) throw new UnauthorizedError()
        const payload = verifyToken(token)
        console.log(payload);

        if (!payload) throw new UnauthorizedError()
        res.json(payload);
    } catch (error) {
        errorHandler(error, res)
    }
}