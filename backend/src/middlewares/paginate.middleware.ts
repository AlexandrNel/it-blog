import type { Request, Response, NextFunction } from 'express'

export type PaginationParams = {
  page: number
  limit: number
}
export const paginateMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const query = req.query
  const { page, limit } = query as unknown as PaginationParams
  const pagination = { page: Number(page) || 1, limit: Number(limit) || 10 }
  req.pagination = pagination
  next()
}
