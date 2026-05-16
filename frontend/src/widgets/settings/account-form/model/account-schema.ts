import z from "zod";

export const accountSettingsSchema = z.object({
	email: z.email({ message: "Введите корректный email" }),
	username: z.string().min(1, { message: "Введите никнейм" }),
});

export type AccountSettingsFormValues = z.infer<typeof accountSettingsSchema>;
