import z from "zod";
import type { User } from "~/generated/prisma/client.js";

export class UserDto {
  email;
  id;
  role;
  username;
  avatar;
  createdAt;
  updatedAt;
  isBlocked;
  pendingEmail;

  constructor(model: User, avatar?: string | null) {
    this.id = model.id;
    this.avatar = avatar ?? "";
    this.email = model.email;
    this.pendingEmail = model.pendingEmail;
    this.role = model.role;
    this.username = model.username;
    this.isBlocked = model.isBlocked;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
  }
}
export class AuthorDto {
  id;
  email;
  username;
  avatar;

  constructor(model: User, avatar?: string | null) {
    this.id = model.id;
    this.email = model.email;
    this.username = model.username;
    this.avatar = avatar ?? "";
  }
}

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(6, "Минимум 6 симолов")
    .max(25, "Максимум 25 символов")
    .regex(/^[a-zA-Z0-9]+$/, {
      error: "В никнейме должны быть буквы и цифры без пробелов",
    }),
});
export const UserUpdatePasswordSchema = z.object({
  oldPassword: z
    .string()
    .nonempty("Введите пароль")
    .min(8, "Минимум 8 символов"),
  newPassword: z
    .string()
    .nonempty("Введите пароль")
    .min(8, "Минимум 8 символов"),
});

export type UserUpdatePasswordRequest = z.infer<
  typeof UserUpdatePasswordSchema
>;
