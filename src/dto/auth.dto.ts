import z from "zod";
import { NicknameSchema } from "./nickname.dto.js";

export const registerSchema = z.object({
  email: z.email(),
  nickname: NicknameSchema.shape.nickname,
  password: z.string().min(8),
});
export const loginSchema = z.object({
  login: z
    .string("Введите почту или никнейм")
    .nonempty("Введите почту или никнейм"),
  password: z.string().min(8),
});

export type RegisterDataType = z.infer<typeof registerSchema>;
export type LoginDataType = z.infer<typeof loginSchema>;
