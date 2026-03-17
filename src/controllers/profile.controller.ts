import type { Request, Response } from "express";
import { asyncHandler } from "~/shared/helpers/asyncHandler.js";
import { ApiError } from "~/shared/lib/api-error.js";
import { ProfileService } from "~/services/profile.service.js";
import type {
  ProfileMetaInfoResponseDto,
  ProfileResponseDto,
  ProfileStatsResponseDto,
} from "~/dto/profile.dto.js";
import { updateProfileSchema } from "~/dto/profile.dto.js";

const profileService = new ProfileService();

function getParamId(req: Request): string {
  const id = req.params.id;
  if (!id) throw ApiError.NotFoundError("Не передан id профиля");
  return id;
}

function getUser(req: Request) {
  const user = req.user;
  if (!user) throw ApiError.BadRequest("Пользователь не авторизован");
  return user;
}

// --------------------------------------------------------------------

export const getProfileByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const id = getParamId(req);
    const profile = await profileService.getByUserIdOrNickname(id);
    res.status(200).json(profile as ProfileResponseDto);
  },
);
export const getProfileMetaByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const viewer = req.user;
    const id = getParamId(req);
    const meta = await profileService.getMetaById(id, viewer?.id);
    res.status(200).json(meta as ProfileMetaInfoResponseDto);
  },
);
export const getProfileStatisticByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const id = getParamId(req);
    const statistic = await profileService.getStatisticById(id);
    res.status(200).json(statistic as ProfileStatsResponseDto);
  },
);

export const updateProfileByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const viewer = getUser(req);
    const id = getParamId(req);
    const data = await updateProfileSchema.parseAsync(req.body);
    const profile = await profileService.updateById(id, viewer.id, data);
    res.status(200).json(profile as ProfileResponseDto);
  },
);
