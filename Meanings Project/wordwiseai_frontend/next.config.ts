import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  distDir: '.next', // Explicitly set the build directory
  /* config options here */
};

export default nextConfig;
