import { errorHandler } from "~/utils/errorHandler.js";
import { AuthService } from "../services/auth.service.js"
import type { Response, Request } from 'express'
import type { AuthenticatedRequest } from "~/types/express.js";

const authService = new AuthService()

export const getMe = async (req: Request, res: Response) => {
    try {
        const userId = (req as unknown as AuthenticatedRequest).user.id
        const user = await authService.getMe(userId);
        res.json(user);
    } catch (err) {
        errorHandler(err, res)
    }
};
