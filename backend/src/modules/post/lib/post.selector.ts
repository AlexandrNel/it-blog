import type { Prisma } from '@/generated/prisma/client.js'

export const authorInclude: { select: Prisma.UserSelect } = {
  select: {
    id: true,
    email: true,
    username: true,
    avatar: true,
    displayName: true,
  },
}
export const tagInclude = {
  select: { tag: { select: { id: true, name: true, key: true } } },
}
export const categoryInclude = {
  select: { id: true, value: true, key: true },
}

export const previewInclude = {
  author: authorInclude,
  tags: tagInclude,
  category: categoryInclude,
  postVotes: { select: { user_id: true, value: true } },
  comments: { select: { id: true } },
}

export const fullInclude = {
  author: authorInclude,
  tags: tagInclude,
  category: categoryInclude,
}
