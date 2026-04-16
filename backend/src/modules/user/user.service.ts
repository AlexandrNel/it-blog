import { withClient } from '@/shared/helpers/with-db-client.js'
import { ApiError } from '@/shared/lib/api-error.js'
import { prisma } from '@/shared/lib/prisma.js'
import { ProfileService } from '@/modules/profile/profile.service.js'
import {
  names,
  NumberDictionary,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import { comparePassword, hashPassword } from '@/shared/lib/utils/password.js'
import type { User } from './user.types.js'
import { toUser } from './user.transformer.js'

type HasUserRequest = { id: string } | { username: string }

export class UserService {
  constructor(private profileService: ProfileService) {}

  async getMe(userId?: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw ApiError.NotFoundError('Пользователь не найден')
    return toUser(user)
  }

  getUserById = withClient(
    async (client, data: HasUserRequest): Promise<User> => {
      const user = await client.user.findUnique({ where: data })
      if (!user) throw ApiError.NotFoundError('Пользователь не найден')
      return toUser(user)
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

  async generateUniqueUsername(email?: string | null): Promise<string> {
    const MAX_ATTEMPTS = 5
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const username = await this.buildUsername(email, { onlyEmail: i === 0 })
      const exists = await this.usernameIsAvailable(undefined, {
        username,
      })
      if (exists.isAvailable) return username
    }

    return `user_${Date.now()}`
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

  private async buildUsername(
    email?: string | null,
    options?: { onlyEmail?: boolean }
  ): Promise<string> {
    const leftEmailPart = email?.split('@')?.[0]
    if (options?.onlyEmail && leftEmailPart) return leftEmailPart
    const number = NumberDictionary.generate({ length: 3 })
    const randomName = uniqueNamesGenerator({
      dictionaries: leftEmailPart ? [[leftEmailPart], number] : [names, number],
      style: 'capital',
      separator: '',
    })
    return randomName
  }
}
