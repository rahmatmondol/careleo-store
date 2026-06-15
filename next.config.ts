import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["careleo.care", "admin.careleo.care", "api.careleo.care"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8090',
        pathname: '/api/v1/media/**',
      },
    ],
  },
};

export default nextConfig;
