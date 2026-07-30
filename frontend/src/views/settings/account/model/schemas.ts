import z from "zod";

export const accountSettingsSchema = z.object({
  email: z.email({ error: "Введите корректный email" }),
  username: z
    .string()
    .min(4, "Минимум 4 симолов")
    .max(20, "Максимум 20 символов")
    .regex(/^[a-zA-Z0-9]+$/, {
      error: "В никнейме должны быть буквы и цифры без пробелов",
    }),
});

export type AccountSettingsFormValues = z.infer<typeof accountSettingsSchema>;
