import { AppError } from "./AppError.js";


export class NotFoundError extends AppError {
    constructor(message = "Ресурс не найден") {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Нет доступа") {
        super(message, 401);
    }
}

export class ValidationError extends AppError {
    constructor(message = "Неверные данные") {
        super(message, 400);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Доступ запрещён") {
        super(message, 403);
    }
}