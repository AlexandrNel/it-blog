export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code?: string
    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}