import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_SHA:
      process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_BUILD_SHA ?? 'dev',
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString().split('T')[0],
  },
};

export default nextConfig;
