import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["https://example.com"], // Add your image hosting domain or API
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all external images
      },
    ],
  },
};

export default withNextIntl(nextConfig);
