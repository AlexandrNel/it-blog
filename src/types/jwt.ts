import type { User } from "~/generated/prisma/client.js"

export type TokenPayload = Pick<User, 'id' | 'role'>
