import type { User as UserType } from '../../../generated/prisma/client.js'

export type User = Omit<UserType, 'password'>
export type Author = Pick<
  User,
  'id' | 'email' | 'username' | 'avatar' | 'displayName'
>
