import type { Request, Response, NextFunction } from "express";
import { ApiError } from "~/shared/lib/api-error.js";
import { verifyToken } from "~/shared/utils/jwt.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token: string | undefined = req.cookies.access_token;
  if (!token) throw ApiError.UnauthorizedError();
  const payload = verifyToken(token);

  if (!payload) {
    res.clearCookie("access_token");
    throw ApiError.UnauthorizedError("Токен не действителен");
  }

  req.user = payload;
  next();
};

export function getUser(req: Request) {
  const user = req.user;
  if (!user) throw ApiError.BadRequest("Пользователь не авторизован");
  return user;
}
