import z from "zod/v4";

const envClientSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  NEXT_PUBLIC_API_URL: z.string("NEXT_PUBLIC_API_URL должен быть указан обязательно"),
  NEXT_PUBLIC_SITE_URL: z.string("NEXT_PUBLIC_SITE_URL должен быть указан обязательно"),
  NEXT_PUBLIC_DEMO: z.preprocess((v: string) => v === "true", z.boolean()).default(false),
});

const _env = envClientSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_DEMO: process.env.NEXT_PUBLIC_DEMO,
});

if (!_env.success) {
  console.error("❌ [ENV VALIDATION ERROR]:", z.treeifyError(_env.error).properties);
  if (typeof window === "undefined") {
    throw new Error("Client env validation failed on server-side rendering");
  }
}

type Env = z.infer<typeof envClientSchema>;

export const env: Env = _env.success ? _env.data : ({} as Env);
