import AuthService from "../services/auth.service.js"
import type { Response, Request, CookieOptions } from 'express'
import type { AuthenticatedRequest } from "~/shared/types/express.js";
import { loginSchema, registerSchema } from "~/dto/auth.dto.js";
import { refreshToken, signToken, verifyToken } from "~/shared/utils/jwt.js";
import { ApiError } from "~/shared/lib/api-error.js";
import { asyncHandler } from "~/shared/helpers/asyncHandler.js";



const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false, // must be true in prodaction!
    sameSite: "lax",
    path: "/",
    domain: "localhost",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d
};

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as unknown as AuthenticatedRequest).user.id
    const user = await AuthService.getMe(userId);
    res.status(200).json(user);
});

export const register = asyncHandler(async (req: Request, res: Response) => {
    const data = await registerSchema.parseAsync(req.body)
    const { user, token } = await AuthService.register(data)
    res.cookie('access_token', token, cookieOptions)
    res.status(201).json(user);
});
export const login = asyncHandler(async (req: Request, res: Response) => {
    const data = await loginSchema.parseAsync(req.body)
    const { user, token, refresh } = await AuthService.login(data)
    res.cookie('access_token', token, cookieOptions)
    res.cookie('refresh_token', refresh, cookieOptions)
    res.json(user);
});
export const logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie('access_token')
    res.clearCookie('refresh_token')
    res.status(200).json()
});
export const check = asyncHandler(async (req: Request, res: Response) => {
    const token: string | undefined = req.cookies.access_token
    if (!token) throw ApiError.UnauthorizedError()
    const payload = verifyToken(token)
    if (!payload) {
        res.clearCookie('access_token')
        throw ApiError.UnauthorizedError()
    }
    res.json(payload);
})
export const resfreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refresh: string | undefined = req.cookies.refresh_token
    if (!refresh) throw ApiError.ForbiddenError()
    const jwt = refreshToken(refresh)
    if (!jwt) {
        res.clearCookie('refresh_token')
        res.clearCookie('access_token')
        throw ApiError.UnauthorizedError()
    }
    res.cookie('access_token', jwt, cookieOptions)
    res.json()
})