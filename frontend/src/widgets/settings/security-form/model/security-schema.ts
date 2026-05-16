import z from "zod";

export const securitySettingsSchema = z
	.object({
		currentPassword: z
			.string()
			.min(8, { message: "Текущий пароль должен содержать не менее 8 символов" }),
		newPassword: z
			.string()
			.min(8, { message: "Новый пароль должен содержать не менее 8 символов" }),
		confirmNewPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "Пароли не совпадают",
		path: ["confirmNewPassword"],
	});

export type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>;
