import "express-serve-static-core";
import { Request } from 'express'

declare global {
    namespace Express {
        interface Request {
            user?: {
                id?: string
            }
            pagination?: {
                page: number,
                limit: number
            },
            updateView?: boolean
        }
    }
}

export interface AuthenticatedRequest extends Request {
    user: { id: string }
}