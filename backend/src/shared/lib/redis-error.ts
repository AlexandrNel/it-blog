export class RedisError extends Error {
  public readonly body
  constructor(message: string, body?: {}) {
    super(message)
    this.body = body
  }
  static ExistCacheError(message: string, ttl: number) {
    throw new RedisError(message, { ttl })
  }
}
