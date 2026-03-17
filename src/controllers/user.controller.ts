import type { Request, Response } from "express";
import { NicknameService } from "~/services/nickname.service.js";
import { asyncHandler } from "~/shared/helpers/asyncHandler.js";
import { ApiError } from "~/shared/lib/api-error.js";
import z from "zod";
import { NicknameSchema } from "~/dto/nickname.dto.js";

export const generateNickname = asyncHandler(
  async (req: Request, res: Response) => {
    const email = req.query.email as string;
    const result = await z.safeParseAsync(z.email(), email);
    const extracted = result.success ? result.data.split("@")?.[0] : undefined;
    const nickname = await NicknameService.generateUnique(extracted);
    res.status(200).json({ nickname });
  },
);
export const checkNickname = asyncHandler(
  async (req: Request, res: Response) => {
    const nickname = req.query.nickname;
    const result = await NicknameSchema.parseAsync({ nickname });
    const isAvailable = await NicknameService.isAvailable(result.nickname);
    res.status(200).json({ isAvailable });
  },
);
