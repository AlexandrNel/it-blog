import type { Request, Response } from "express";
import { asyncHandler } from "~/shared/helpers/asyncHandler.js";
import { ApiError } from "~/shared/lib/api-error.js";
import z from "zod";
import { UserService } from "~/services/user.service.js";
import { ProfileService } from "~/services/profile.service.js";
import { UsernameSchema, UserUpdatePasswordSchema } from "~/dto/user.dto.js";
import { getUserSafe } from "~/middlewares/user.middleware.js";
import { getUser } from "~/middlewares/auth.middleware.js";

const userSerice = new UserService(new ProfileService());

export const generateUsername = asyncHandler(
  async (req: Request, res: Response) => {
    const email = req.query.email as string;
    const result = await z.safeParseAsync(z.email(), email);
    const extracted = result.success ? result.data.split("@")?.[0] : undefined;
    const username = await userSerice.generateUniqueUsername(extracted);
    res.status(200).json({ username });
  },
);
export const checkUsername = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await UsernameSchema.parseAsync({
      username: req.query.username,
    });
    const data = await userSerice.usernameIsAvailable({
      username: result.username,
    });
    if (!data.isAvailable) throw ApiError.BadRequest("Никнейм занят");
    res.status(204).send();
  },
);

export const getSettings = asyncHandler(async (req, res) => {
  const id = req.user?.id;
  if (!id) throw ApiError.BadRequest("Не передан ID");
  const settings = await userSerice.getSettingsByUserId(id);
  res.status(200).json(settings);
});

export const updateUsername = asyncHandler(async (req, res) => {
  const user = getUser(req);
  const result = await UsernameSchema.parseAsync(req.body);
  await userSerice.updateUsername(result.username, user.id);
  res.status(204).send();
});
export const updatePassword = asyncHandler(async (req, res) => {
  const user = getUser(req);
  const result = await UserUpdatePasswordSchema.parseAsync(req.body);
  await userSerice.updatePassword(
    result.oldPassword,
    result.newPassword,
    user.id,
  );
  res.status(204).send();
});
