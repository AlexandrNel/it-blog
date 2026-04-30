import z from "zod";

export const RegisterSchema = z.object({
  email: z.email({ error: "Неверный Email" }),
  password: z.string().min(8, { error: "Пароль должен состоять как минимум из 8 символов" }),
});

export type RegisterFormValuesType = z.infer<typeof RegisterSchema>;
