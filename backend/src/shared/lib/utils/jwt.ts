import jwt from 'jsonwebtoken'
import { config } from '@/config/index.js'
import type { User } from '../../../../generated/prisma/client.js'

export type SessionEntity = {
  id: string
  role: User['role']
}

export const signToken = (
  payload: SessionEntity,
  type: 'jwt' | 'refresh' = 'jwt'
) => {
  return jwt.sign(payload, config[type].secret, {
    expiresIn: config[type].expiresIn,
  })
}

export const verifyToken = (token: string, type: 'jwt' | 'refresh' = 'jwt') => {
  try {
    const payload = jwt.verify(token, config[type].secret)
    if (!payload) {
      return null
    }
    return payload as SessionEntity & jwt.JwtPayload
  } catch (err) {
    return null
  }
}

/**
 *
 * @param token refresh token
 * @returns jwt token
 */
export const refreshToken = (refreshToken: string) => {
  const payload = verifyToken(refreshToken, 'refresh')
  if (!payload) {
    return null
  } else {
    return signToken({ id: payload.id, role: payload.role })
  }
}
