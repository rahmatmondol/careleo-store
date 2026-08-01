import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["careleo.care", "admin.careleo.care", "api.careleo.care"],
  images: {
    dangerouslyAllowLocalIP: true,
    // Any host missing from this list makes next/image return a 400 and the card
    // renders an empty box — which is exactly what happened to the homepage
    // trending products in production. ProductImage also swaps in a placeholder
    // on error so a bad URL degrades visibly instead of silently.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // media-service behind the production gateway
      {
        protocol: "https",
        hostname: "api.careleo.care",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "careleo.care",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.careleo.care",
        pathname: "/**",
      },
      // local hybrid stack: gateway (8090) and media-service (3017) direct
      {
        protocol: "http",
        hostname: "localhost",
        port: "8090",
        pathname: "/api/v1/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3017",
        pathname: "/**",
      },
      // Local IP for testing on mobile/other devices
      {
        protocol: "http",
        hostname: "192.168.0.103",
        port: "8090",
        pathname: "/api/v1/media/**",
      },
    ],
  },
};

export default nextConfig;
