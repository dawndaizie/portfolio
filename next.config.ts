import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

module.exports = {
  allowedDevOrigins: ['10.0.0.233'],
}

export default nextConfig;
