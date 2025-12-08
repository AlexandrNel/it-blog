import { AppError } from "./AppError.js";

export const isAppError = (error: unknown) => {
    return error instanceof AppError
}