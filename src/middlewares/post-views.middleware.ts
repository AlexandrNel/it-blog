import { hash } from 'crypto';
import type { Request, Response, NextFunction } from 'express'
import { ValidationError } from '~/lib/errors/index.js';
import { getRedis } from '~/shared/redis/client.js'

export type PaginationParams = {
    page: number,
    limit: number
}
export const postViewsMiddleware = async (req: Request, _: Response, next: NextFunction) => {
    const redis = getRedis()
    const ip = req.ip
    const id = req.params.id
    req.updateView = false
    if (!id) {
        return next()
    }
    const userAgent = req.headers['user-agent'] || ""
    const key = `post:${id}:view:${hash('sha256', ip + userAgent.slice(0, 30))}`;
    const exists = await redis.exists(key);

    if (!exists) {
        await redis.set(key, 1, 'EX', 24 * 60 * 60); // 1 день TTL
        req.updateView = true
    }
    next()
};
