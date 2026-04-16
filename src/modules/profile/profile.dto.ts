import z from 'zod'
import type { Author } from '../user/user.types.js'

const optionalUrl = (pattern?: RegExp) =>
  z.preprocess(
    (val) => (val === '' ? undefined : val),
    pattern ? z.url({ hostname: pattern }).optional() : z.url().optional()
  )

export const updateProfileSchema = z
  .object({
    displayName: z
      .string()
      .min(1, { message: 'Введите имя' })
      .optional()
      .or(z.literal('')),
    bio: z.string().max(2000).optional(),
    location: z.string().optional().or(z.literal('')),
    contacts: z
      .object({
        email: z.preprocess(
          (val) => (val === '' ? undefined : val),
          z.email().optional()
        ),
        site: optionalUrl(),
        links: z
          .object({
            github: optionalUrl(/github/),
            telegram: optionalUrl(/telegram/),
          })
          .optional()
          .nullable(),
      })
      .optional()
      .nullable(),
  })
  .transform((data) => {
    return {
      ...data,
      contacts: data.contacts ?? undefined,
      displayName: data.displayName ?? undefined,
    }
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
