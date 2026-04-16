import type { Post } from '@/generated/prisma/client.js'
import type { Author } from '@/modules/user/user.types.js'

export type PostTag = { id: string; name: string; key: string }
export type PostCategory = { id: string; value: string; key: string }
export type PostVote = { user_id: string; value: number }

export type PostStatistic = {
  views: number
  comments: number
  votes: { likes: number; dislikes: number; userVote: number | null }
}

export type BasePost = Post & {
  author: Author
  tags: PostTag[]
  category: PostCategory
  statistic: PostStatistic
}

export type PostFull = Omit<BasePost, 'statistic'>
export type PostPreview = Omit<BasePost, 'content'>
