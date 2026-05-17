import { createMDX } from 'fumadocs-mdx/next';
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/docs.md',
        destination: '/llms.mdx/docs'
      },
      {
        source: '/docs/:path*.md',
        destination: '/llms.mdx/docs/:path*'
      },
      {
        source: '/:lang/docs.md',
        destination: '/llms.mdx/:lang/docs'
      },
      {
        source: '/:lang/docs/:path*.md',
        destination: '/llms.mdx/:lang/docs/:path*'
      }
    ];
  }
};

const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(nextConfig));
