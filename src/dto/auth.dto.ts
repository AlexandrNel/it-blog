import z from "zod";

export const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})

export type RegisterDataType = z.infer<typeof registerSchema>
