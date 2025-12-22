import "express-serve-static-core";
import { Request } from 'express'

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