import type { NextFunction, Request, Response } from "express"

export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return async (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch((e) => next(e))
}
