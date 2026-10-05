import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/portfolio',
  assetPrefix: '/portfolio/', 
};

module.exports = {
  allowedDevOrigins: ['10.0.0.233'],
}

export default nextConfig;
