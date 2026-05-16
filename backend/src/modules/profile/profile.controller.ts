import type { Request, Response } from 'express'
import { asyncHandler } from '@/shared/helpers/asyncHandler.js'
import { ApiError } from '@/shared/lib/api-error.js'
import { ProfileService } from './profile.service.js'
import type {
  ProfileConnectionKind,
  ProfileConnectionsPageResponseDto,
  ProfileConnectionsSummaryResponseDto,
  ProfileMetaInfoResponseDto,
  ProfileResponseDto,
  ProfileStatsResponseDto,
} from './profile.dto.js'
import { updateProfileSchema } from './profile.dto.js'
import type { PaginationParams } from '@/middlewares/paginate.middleware.js'

const profileService = new ProfileService()

function getParamId(req: Request): string {
  const id = req.params.id
  if (!id) throw ApiError.NotFoundError('Не передан id профиля')
  return id
}

function getUser(req: Request) {
  const user = req.user
  if (!user) throw ApiError.BadRequest('Пользователь не авторизован')
  return user
}

function getConnectionKind(req: Request): ProfileConnectionKind {
  const kind = req.params.kind
  if (kind === 'followers' || kind === 'following') return kind
  throw ApiError.BadRequest('Не передан параметр kind')
}

export const getProfileByUserId = asyncHandler(
  async (req: Request, res: Response<ProfileResponseDto>) => {
    const id = getParamId(req)
    const profile = await profileService.getByUserIdOrUsername(id)
    res.status(200).json(profile)
  }
)

export const getProfileMetaByUserId = asyncHandler(
  async (req: Request, res: Response<ProfileMetaInfoResponseDto>) => {
    const viewer = req.user
    const id = getParamId(req)
    const meta = await profileService.getMetaById(id, viewer?.id)
    res.status(200).json(meta)
  }
)

export const getProfileStatisticByUserId = asyncHandler(
  async (req: Request, res: Response<ProfileStatsResponseDto>) => {
    const id = getParamId(req)
    const statistic = await profileService.getStatisticById(id)
    res.status(200).json(statistic)
  }
)

export const getProfileConnectionsSummary = asyncHandler(
  async (req: Request, res: Response<ProfileConnectionsSummaryResponseDto>) => {
    const id = getParamId(req)
    const summary = await profileService.getConnectionsSummary(id)
    res.status(200).json(summary)
  }
)

export const getProfileConnectionsPage = asyncHandler(
  async (req: Request, res: Response<ProfileConnectionsPageResponseDto>) => {
    const id = getParamId(req)
    const kind = getConnectionKind(req)
    const { page, limit } = req.pagination as PaginationParams
    const result = await profileService.getConnectionsPage(
      id,
      kind,
      page,
      limit
    )
    res.status(200).json(result)
  }
)

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = getUser(req)
    console.log(req.body);
    
    const data = await updateProfileSchema.parseAsync(req.body)
    await profileService.updateProfile(user.id, data)
    res.status(204).send()
  }
)
