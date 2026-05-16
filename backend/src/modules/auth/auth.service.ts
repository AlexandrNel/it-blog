import { prisma } from '@/shared/lib/prisma.js'
import bcrypt from 'bcrypt'
import { signToken } from '@/shared/lib/utils/jwt.js'
import { ApiError } from '@/shared/lib/api-error.js'
import {
  loginSchema,
  type LoginDataType,
  type RegisterDataType,
} from './auth.dto.js'
import { toUser } from '../user/index.js'
import z from 'zod'
import { UserService } from '../user/user.service.js'
import {
  isPrismaError,
  PrismaErrorCode,
} from '@/shared/lib/utils/is-prisma-error.js'

export class AuthService {
  constructor(public userSerive: UserService) {}

  async register(data: RegisterDataType) {
    const { email, password } = data
    const username = await this.userSerive.generateUniqueUsername()
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    try {
      const newUser = await prisma.$transaction(async (tx) => {
        const existing = await tx.user.findUnique({ where: { email } })
        if (existing)
          throw ApiError.BadRequest('Пользователь с таким email уже существует')
        const user = await tx.user.create({
          data: {
            username,
            email,
            password: passwordHash,
            pendingEmail: email,
          },
        })
        await tx.profile.create({ data: { userId: user.id } })
        return user
      })

      const token = signToken({ id: newUser.id, role: newUser.role })
      return { token, user: toUser(newUser) }
    } catch (error) {
      if (
        isPrismaError(error) &&
        error.code === PrismaErrorCode.UNIQUE_CONSTRAINT
      ) {
        throw ApiError.BadRequest('Пользователь с таким email уже существует')
      }
      throw error
    }
  }

  async login(data: LoginDataType) {
    const result = await loginSchema.parseAsync(data)
    const isEmail = await z.email().safeParseAsync(result.login)
    const user = await prisma.user.findUnique({
      where: isEmail ? { email: result.login } : { username: result.login },
    })
    if (!user) throw ApiError.NotFoundError('Пользователь не найден')
    const useDto = toUser(user)
    const isVerify = await bcrypt.compare(data.password, user.password)
    if (!isVerify) throw ApiError.BadRequest('Не верный логин или пароль')
    const token = signToken({ id: user.id, role: user.role })
    const refresh = signToken({ id: user.id, role: user.role }, 'refresh')
    return { token, refresh, user: useDto }
  }
}
