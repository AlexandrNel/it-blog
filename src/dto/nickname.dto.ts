import z from "zod";

export const NicknameSchema = z.object({
  nickname: z
    .string()
    .min(6, "Минимум 6 симолов")
    .max(25, "Максимум 25 символов")
    .regex(/^[a-zA-Z0-9]+$/, {
      error: "В никнейме должны быть буквы и цифры без пробелов",
    }),
});
