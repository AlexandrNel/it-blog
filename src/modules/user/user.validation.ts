import z from 'zod'

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(6, 'Минимум 6 симолов')
    .max(25, 'Максимум 25 символов')
    .regex(/^[a-zA-Z0-9]+$/, {
      error: 'В никнейме должны быть буквы и цифры без пробелов',
    }),
})

export const UserUpdatePasswordSchema = z.object({
  oldPassword: z
    .string()
    .nonempty('Введите пароль')
    .min(8, 'Минимум 8 символов'),
  newPassword: z
    .string()
    .nonempty('Введите пароль')
    .min(8, 'Минимум 8 символов'),
})

export type UserUpdatePasswordRequest = z.infer<typeof UserUpdatePasswordSchema>
export type UsernameRequest = z.infer<typeof UsernameSchema>
