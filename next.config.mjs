/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

