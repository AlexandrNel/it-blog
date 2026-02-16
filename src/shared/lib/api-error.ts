export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly errors?: unknown[];
    public readonly code?: string
    constructor(message: string, statusCode = 500, errors = []) {
        super(message);
        this.errors = errors
        this.statusCode = statusCode;
    }

    static NotFoundError(message = "Ресурс не найден") {
        return new ApiError(message, 404)
    }
    static UnauthorizedError(message = "Нет доступа") {
        return new ApiError(message, 401)
    }
    static BadRequest(message = "Неверные данные", errors = []) {
        return new ApiError(message, 400, errors)
    }
    static ForbiddenError(message = "Доступ запрещен") {
        return new ApiError(message, 403)
    }
}

export const isAppError = (error: unknown) => {
    return error instanceof ApiError
}