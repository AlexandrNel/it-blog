type Env = {
  API_URL: string;
  SITE_URL: string;
};

export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const satisfies Env;
