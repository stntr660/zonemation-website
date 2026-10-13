import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zonemation - Unlocking the Potential of Those Who Advance the World',
  description: 'Zonemation builds AI software products: JMLA Pro for wholesale trade and Atrapa for customer conversations.',
  keywords: 'JMLA Pro, Atrapa, AI software, SaaS, wholesale management, WhatsApp CRM, AI assistant',
  authors: [{ name: 'Zonemation' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Zonemation',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
