import "express-serve-static-core";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id?: string
            }
        }
    }
}

export interface AuthenticatedRequest extends Request {
    user: { id: string }
}