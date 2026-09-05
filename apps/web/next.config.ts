import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  reactStrictMode: true,
  transpilePackages: ['@portal/shared-types', '@portal/api-client', '@portal/ui'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    NEXT_PUBLIC_AI_SERVICE_URL: process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8001/api/v1',
  },
};

export default nextConfig;
