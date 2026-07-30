import { withClient } from '@/shared/helpers/with-db-client.js'
import { ApiError } from '@/shared/lib/api-error.js'
import { prisma } from '@/shared/lib/prisma.js'
import { type ProfileService } from '@/modules/profile/profile.service.js'
import {
  names,
  NumberDictionary,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import { comparePassword, hashPassword } from '@/shared/lib/utils/password.js'
import type { User } from './user.types.js'
import { toUser } from './user.transformer.js'
import { randomUUID } from 'node:crypto'
import { DEMO_POSTS } from './lib/posts.js'
import slugify from 'slugify/slugify.js'
import { DEMO_COMMENTS } from './lib/comments.js'

type HasUserRequest = { id: string } | { username: string }

function randomInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

function createComment() {
  const content = DEMO_COMMENTS[
    randomInt(0, DEMO_COMMENTS.length - 1)
  ] as string
  return JSON.stringify({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        attrs: { textAlign: null },
        content: [
          {
            type: 'text',
            text: content,
          },
        ],
      },
    ],
  })
}

export class UserService {
  constructor(private profileService: ProfileService) {}

  private async buildUsername(): Promise<string> {
    const number = NumberDictionary.generate({ length: 4 })

    const randomName = uniqueNamesGenerator({
      dictionaries: [names, number],
      style: 'capital',
      separator: '',
    })
    return randomName
  }

  async getMe(userId?: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { demo: true },
    })
    if (!user) throw ApiError.NotFoundError('Пользователь не найден')
    return toUser({ ...user, demo: !!user.demo })
  }

  getUserById = withClient(
    async (client, data: HasUserRequest): Promise<User> => {
      const user = await client.user.findUnique({
        where: data,
        include: { demo: true },
      })
      if (!user) throw ApiError.NotFoundError('Пользователь не найден')
      return toUser({ ...user, demo: !!user.demo })
    }
  )
  async getSettingsByUserId(id: string) {
    const settings = await prisma.$transaction(async (tx) => {
      const user = await this.getUserById(tx, { id })
      const data = await this.profileService.getByUserIdOrUsername(id)
      return {
        profile: { ...data.profile, displayName: user.displayName },
        account: {
          username: user.username,
          email: user.email,
        },
        meta: { emailVerified: !user.pendingEmail },
      }
    })
    return settings
  }
  async updateUsername(username: string, userId: string) {
    return prisma.$transaction(async (tx) => {
      const data = await this.usernameIsAvailable(tx, { username })
      if (!data.isAvailable) throw ApiError.BadRequest('Никнейм занят')
      await tx.user.update({
        where: { id: userId },
        data: { username: username },
      })
    })
  }
  async updatePassword(
    oldPassword: string,
    newPassword: string,
    userId: string
  ) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw ApiError.NotFoundError('Пользователь не найден')
    const isVerify = await comparePassword(oldPassword, user.password)
    if (!isVerify) throw ApiError.BadRequest('Неверный пароль')
    const password = await hashPassword(newPassword)
    await prisma.user.update({
      where: { id: userId },
      data: { password },
    })
  }

  async generateUniqueUsername(): Promise<string> {
    const MAX_ATTEMPTS = 5
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const username = await this.buildUsername()
      const exists = await this.usernameIsAvailable(undefined, {
        username,
      })
      if (exists.isAvailable) return username
    }

    return `user_${Date.now()}`
  }

  async createDemoUser() {
    const base = await this.buildUsername()
    const email = `${base}@demo.com`
    const password = randomUUID().slice(0, 8)

    const { previewContent, content, ...post } = DEMO_POSTS[
      randomInt(0, DEMO_POSTS.length - 1)
    ] as (typeof DEMO_POSTS)[number]

    const [users, posts] = await Promise.all([
      prisma.user.findMany(),
      prisma.post.findMany(),
    ])

    const shuffledUsers = users.toSorted(() => 0.5 - Math.random()).slice(0, 2)
    const randomPost = posts.toSorted(() => 0.5 - Math.random())[0]

    return await prisma.user.create({
      data: {
        demo: { create: {} },
        email,
        username: `demo${base}`,
        password,
        displayName: base,
        profile: {
          create: { bio: 'Демо аккаунт' },
        },
        comments: randomPost && {
          create: {
            content: createComment(),
            postId: randomPost.id,
          },
        },
        posts: {
          create: {
            ...post,
            slug: slugify(post.title, { lower: true, strict: true }).concat(
              randomUUID().slice(0, 4)
            ),
            published: true,
            content: JSON.stringify(content),
            previewContent: JSON.stringify(previewContent),
            category: {
              connectOrCreate: {
                where: { key: 'demo' },
                create: { key: 'demo', value: 'Демо' },
              },
            },
            tags: {
              create: {
                tag: {
                  connectOrCreate: {
                    where: { key: 'demo' },
                    create: { key: 'demo', name: 'Демо' },
                  },
                },
              },
            },
            comments: {
              createMany: {
                skipDuplicates: true,
                data: shuffledUsers.map((v) => ({
                  authorId: v.id,
                  content: createComment(),
                })),
              },
            },
          },
        },
      },
    })
  }

  usernameIsAvailable = withClient(
    async (client, data: { username: string }) => {
      if (!data.username) throw ApiError.BadRequest('Не передан параметр')
      const isExist = await client.user.findUnique({
        where: { username: data.username },
      })
      return { user: isExist, isAvailable: !isExist }
    }
  )
}
