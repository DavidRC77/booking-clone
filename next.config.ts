import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'r-xx.bstatic.com',
      'cf.bstatic.com',
      'logospng.org'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
