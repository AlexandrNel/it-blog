import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    cacheComponents: true,
    images: { remotePatterns: [{ "hostname": "example.com" }] }
}

export default nextConfig