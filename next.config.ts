import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler for better performance
  reactStrictMode: true,

  // Optimize production builds
  poweredByHeader: false,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Reduce bundle size
  compress: true,
};

export default nextConfig;
