import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: { remotePatterns: [{ "hostname": "example.com" }, {hostname: "localhost"}] },
    logging: {
        browserToTerminal: true,
    },
    output: 'standalone'
}

export default nextConfig