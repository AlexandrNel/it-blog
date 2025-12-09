import { isAppError } from "~/lib/errors/isAppError.js"
import type { Response } from 'express'
import { ZodError, z } from "zod";

export const errorHandler = (err: unknown,
    // req: Request,
    res: Response,
    // next: NextFunction
) => {
    if (isAppError(err)) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    if (err instanceof ZodError) {
        const flattened = z.flattenError(err);
        return res.status(400).json({
            message: "Неверные данные",
            errors: flattened.fieldErrors
        })
    }

    console.error("Необработанная ошибка:", err);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" })
}