import z from 'zod'
import type { Author } from '../user/user.types.js'

const optionalUrl = (pattern?: RegExp) =>
  z.preprocess(
    (val) => val ?? undefined,
    pattern ? z.url({ hostname: pattern }).optional() : z.url().optional()
  )

export const updateProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Минимум 1 символ')
    .max(32, { message: 'Максимум 32 символа' })
    .nullable()
    .optional()
    .or(z.literal('')),
  bio: z
    .string()
    .max(200, { message: 'Максимум 200 символов' })
    .optional()
    .or(z.literal('')),
  location: z.string().optional(),
  contacts: z
    .object({
      email: z
        .email({ error: 'Должно быть email' })
        .optional()
        .or(z.literal('', { error: 'поля' })),
      site: z.url().optional().or(z.literal('')),
      links: z
        .object({
          github: z
            .url({ hostname: /github/ })
            .optional()
            .or(z.literal('')),
          telegram: z
            .string()
            .optional()
            .or(z.literal(''))
            .refine((val) => {
              if (val) {
                return /^https?:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]{5,32}$/.test(
                  val
                )
              }
            }),
        })
        .optional(),
    })
    .optional(),
})

export type UpdateProfileRequestDto = z.infer<typeof updateProfileSchema>

export type ProfileContactsDto = UpdateProfileRequestDto

export type ProfileDto = {
  author: Author
  contacts: ProfileContactsDto | null
  bio: string
}

export type ProfileStatsDto = {
  unpublishedPosts: number
  publishedPosts: number
  subscribers: number
  viewers: number
  comments: number
}

export type ProfileConnectionKind = 'followers' | 'following'

export type ProfileConnectionUser = Pick<
  Author,
  'id' | 'avatar' | 'displayName' | 'username'
>

export type ProfileConnectionsPageDto = {
  users: ProfileConnectionUser[]
  nextPage: number | null
  total: number
}

export type ProfileConnectionsSummaryDto = {
  followers: number
  following: number
}

export type ProfileMetaInfoDto =
  | {
      isOwner: true
      isPublic: boolean
      isBlocked: boolean
    }
  | {
      isOwner: false
      isPublic: boolean
      isBlocked: boolean
      isFollow: boolean
    }

export type ProfileResponseDto = ProfileDto
export type ProfileStatsResponseDto = ProfileStatsDto
export type ProfileMetaInfoResponseDto = ProfileMetaInfoDto
export type ProfileConnectionsPageResponseDto = ProfileConnectionsPageDto
export type ProfileConnectionsSummaryResponseDto = ProfileConnectionsSummaryDto
