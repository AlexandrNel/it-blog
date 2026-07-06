import type { NextConfig } from "next";
import { env } from "@/shared/config";

const nextConfig: NextConfig = {
  cacheComponents: true,
  typedRoutes: true,
  images: { remotePatterns: [{ hostname: new URL(env.API_URL).hostname }] },
  logging: {
    browserToTerminal: true,
  },
  output: "standalone",
};

export default nextConfig;
