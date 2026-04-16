import { prisma } from '@/shared/lib/prisma.js'
import { ApiError } from '@/shared/lib/api-error.js'
import type { Comment, Prisma } from '@/generated/prisma/client.js'
import { buildCollapsedTree } from './utils/build-collapsed-tree.js'
import {
  isPrismaError,
  PrismaErrorCode,
} from '@/shared/lib/utils/is-prisma-error.js'

const commentsInclude = {
  author: {
    select: {
      id: true,
      username: true,
      displayName: true,
      avatar: true,
    },
  },
}
const postInclude = {
  post: {
    select: {
      id: true,
      title: true,
      slug: true,
    },
  },
}

export class CommentService {
  async getByPostId(postId: string) {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'desc' },
      include: commentsInclude,
    })

    return buildCollapsedTree(comments)
  }
  async getBySlug(slug: string) {
    const comments = await prisma.comment.findMany({
      where: { post: { slug } },
      orderBy: { createdAt: 'desc' },
      include: commentsInclude,
    })

    return comments.map(this.toResponse)
  }

  async getByUserId(userId: string) {
    const comments = await prisma.comment.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        ...commentsInclude,
        ...postInclude,
      },
    })
    return comments.map(this.toResponse)
  }
  async getByUsername(username: string) {
    const comments = await prisma.comment.findMany({
      where: { author: { username } },
      orderBy: { createdAt: 'desc' },
      include: {
        ...commentsInclude,
        ...postInclude,
      },
    })
    return comments.map(this.toResponse)
  }

  async createForPost(postId: string, authorId: string, content: string) {
    const post = await prisma.post.findUnique({ where: { id: postId } })
    if (!post) throw ApiError.NotFoundError('Статья не найдена')

    const comment = await prisma.comment.create({
      data: { content, postId, authorId },
      include: commentsInclude,
    })

    return this.toResponse(comment)
  }

  async reply(parentId: string, authorId: string, content: string) {
    const parent = await prisma.comment.findUnique({ where: { id: parentId } })
    if (!parent) throw ApiError.NotFoundError('Комментарий не найден')

    const comment = await prisma.comment.create({
      data: {
        content,
        postId: parent.postId,
        authorId,
        parentId: parent.id,
      },
      include: commentsInclude,
    })

    return this.toResponse(comment)
  }

  async deleteComment(id: string, userId: string, role: string) {
    const comment = await prisma.comment.findUnique({ where: { id } })
    if (!comment) throw ApiError.NotFoundError('Комментарий не найден')
    if (comment.authorId !== userId && role !== 'ADMIN')
      throw ApiError.ForbiddenError()

    await prisma.comment.delete({ where: { id } })
  }
  async editComment(id: string, userId: string, content: string) {
    try {
      return await prisma.comment.update({
        where: { id, authorId: userId },
        data: { content },
      })
    } catch (error) {
      if (isPrismaError(error) && error.code === PrismaErrorCode.NOT_FOUND) {
        throw ApiError.NotFoundError('Комментарий не найден')
      }
      throw error
    }
  }

  private toResponse(comment: CommentType) {
    return comment
  }
}

export type CommentType = Comment &
  Partial<
    Prisma.CommentGetPayload<{
      include: typeof commentsInclude & typeof postInclude
    }>
  >
