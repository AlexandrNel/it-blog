import z from "zod";

export const profileSettingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(1, "Минимум 1 символ")
    .max(32, { message: "Максимум 32 символа" })
    .optional()
    .or(z.literal("")),
  bio: z.string().trim().max(200, { message: "Максимум 200 символов" }).optional().or(z.literal("")),
  location: z.string().trim().optional().or(z.literal("")),
  contacts: z
    .object({
      email: z.email().trim().optional().or(z.literal("")),
      site: z.url().trim().optional().or(z.literal("")),
      links: z
        .object({
          github: z
            .string()
            .trim()
            .url({ hostname: /github/ })
            .optional()
            .or(z.literal("")),
          telegram: z
            .string()
            .optional()
            .refine((val) => {
              if (val) {
                return /^https?:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]{5,32}$/.test(val);
              }
            })
            .or(z.literal("")),
        })
        .optional(),
    })
    .optional(),
});

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsSchema>;
