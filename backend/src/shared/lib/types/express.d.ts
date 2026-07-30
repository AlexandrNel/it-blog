import 'express-serve-static-core'
import { Request } from 'express'
import type { User } from '@/generated/prisma/client.ts'

declare global {
  namespace Express {
    interface Request {
      user?: {
        role: User['role']
        id: string
      }
      pagination?: {
        page: number
        limit: number
      }
      updateView?: {
        ttl: number
      }
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: { id: string }
}
