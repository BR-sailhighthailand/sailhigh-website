import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '/sailhigh-website',
  assetPrefix: '/sailhigh-website/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
