import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // The old consultancy pages are retired: Zonemation is a product company
  // (JMLA Pro, Atrapa). Temporary redirects so the content can come back.
  async redirects() {
    const retired = '(case-studies|capabilities|industries|insights)'
    return [
      { source: `/:locale(fr|en|es|ar)/:section${retired}/:path*`, destination: '/:locale', permanent: false },
      { source: `/:section${retired}/:path*`, destination: '/', permanent: false },
    ]
  },
}

export default withNextIntl(withPayload(nextConfig))
