import type { NextConfig } from 'next'
import { ENV } from '@/shared/config/env'
const apiHostname = new URL(ENV.API_URL).hostname
const nextConfig: NextConfig = {
    cacheComponents: true,
    images: { remotePatterns: [{hostname: apiHostname}] },
    logging: {
        browserToTerminal: true,
    },
    output: 'standalone'
}

export default nextConfig