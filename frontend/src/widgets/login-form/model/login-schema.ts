import z from "zod";

export const LoginSchema = z.object({
	login: z.string().nonempty("Заполните поле"),
	password: z.string().min(8, { error: "Пароль должен состоять как минимум из 8 символов" }),
});

export type LoginValuesType = z.infer<typeof LoginSchema>;
