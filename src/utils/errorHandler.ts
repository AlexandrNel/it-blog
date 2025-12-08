import { isAppError } from "~/lib/errors/isAppError.js"
import type { Response } from 'express'

export const errorHandler = (error: unknown, res: Response) => {
    if (isAppError(error)) {
        return res.status(error.statusCode).json({ message: error.message })
    } else {
        console.error("Необработанная ошибка:", error);
        return res.status(500).json({ message: "Внутренняя ошибка сервера" })
    }
}