import type { prisma } from '@/shared/lib/prisma.js'
import type {
  PostFull,
  PostPreview,
  PostStatistic,
  PostVote,
} from './post.types.js'
import type { fullInclude, previewInclude } from '../lib/post.selector.js'

export function toStatistic(
  votes: PostVote[],
  comments: { id: string }[],
  views: number,
  userId?: string
): PostStatistic {
  return {
    views,
    comments: comments.length,
    votes: {
      likes: votes.filter((v) => v.value > 0).length,
      dislikes: votes.filter((v) => v.value < 0).length,
      userVote: userId
        ? (votes.find((v) => v.user_id === userId)?.value ?? null)
        : null,
    },
  }
}

export type PrismaPreviewPost = Awaited<
  ReturnType<typeof prisma.post.findMany<{ include: typeof previewInclude }>>
>[number]
export type PrismaFullPost = NonNullable<
  Awaited<
    ReturnType<
      typeof prisma.post.findUnique<{
        include: typeof fullInclude
        where: { id: string }
      }>
    >
  >
>

export function toPreview(post: PrismaPreviewPost): PostPreview {
  const { postVotes, comments, tags, content, author, ...rest } = post
  const { id, username, email, avatar, displayName } = author
  return {
    ...rest,
    tags: tags.map((t) => t.tag),
    statistic: toStatistic(postVotes, comments, post.views),
    author: { id, username, email, avatar, displayName },
  }
}

export function toFull(post: PrismaFullPost): PostFull {
  const { tags, ...rest } = post
  return { ...rest, tags: tags.map((t) => t.tag) }
}
