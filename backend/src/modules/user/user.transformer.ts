import type { User as UserPrisma } from '@/generated/prisma/client.js'
import type { Author, User } from './user.types.js'
import type { UserInclude } from '@/generated/prisma/models.js'

export const toUser = (user: UserPrisma & { demo?: boolean }): User => {
  const { password, ...rest } = user
  return rest
}
export const toAuthor = (user: UserPrisma): Author => {
  const { id, email, username, avatar, displayName } = user
  return {
    id,
    email,
    username,
    avatar,
    displayName,
  }
}
