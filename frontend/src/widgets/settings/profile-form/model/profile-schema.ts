import z from "zod";

export const profileSettingsSchema = z.object({
  displayName: z
    .string()
    .min(1, "Минимум 1 символ")
    .max(32, { message: "Максимум 32 символа" })
    .nullable()
    .optional()
    .or(z.literal("")),
  bio: z.string().max(200, { message: "Максимум 200 символов" }).optional().or(z.literal("")),
  location: z.string().optional(),
  contacts: z
    .object({
      email: z.email().optional().or(z.literal("")),
      site: z.url().optional().or(z.literal("")),
      links: z
        .object({
          github: z
            .url({ hostname: /github/ })
            .optional()
            .or(z.literal("")),
          telegram: z
            .url({ hostname: /telegram/ })
            .optional()
            .or(z.literal("")),
        })
        .optional(),
    })
    .nullable()
    .optional(),
});

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsSchema>;
