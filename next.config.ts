import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
};

module.exports = {
  allowedDevOrigins: ['10.0.0.233'],
}

export default nextConfig;
