import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edfc0c93-c754-494d-9f9c-76185dc39b2d.selstorage.ru',
        pathname: '/avatars/**',
      },
    ],
  },
};

export default nextConfig;
