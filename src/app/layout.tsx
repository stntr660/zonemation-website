import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/lib/theme-provider'
import { AnimatedFavicon } from '@/components/animated-favicon'

export const metadata: Metadata = {
  title: 'Zonemation - Unlocking the Potential of Those Who Advance the World',
  description: 'Leading consulting firm specialized in digital transformation and business strategy',
  keywords: 'consulting, strategy, digital transformation, business advisory',
  authors: [{ name: 'Zonemation' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-[#181a0e] text-white" suppressHydrationWarning>
        <AnimatedFavicon />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
