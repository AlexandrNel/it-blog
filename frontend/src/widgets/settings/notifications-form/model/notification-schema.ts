import z from "zod";

export const notificationSettingsSchema = z.object({
	emailNotifications: z.boolean().default(true),
	marketingEmails: z.boolean().default(false),
	updatesEmails: z.boolean().default(true),
});

export type NotificationSettingsFormValues = z.input<typeof notificationSettingsSchema>;
