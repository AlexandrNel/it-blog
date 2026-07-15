import type { NextConfig } from "next";
import { env } from "@/shared/config";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  cacheComponents: true,
  typedRoutes: true,
  images: { remotePatterns: [{ hostname: new URL(env.API_URL).hostname }] },
  output: "standalone",
};

export default nextConfig;
