import '../globals.css'
import { ThemeProvider } from '@/lib/theme-provider'
import { AnimatedFavicon } from '@/components/animated-favicon'
import { GoogleAnalytics } from '@/components/google-analytics'

export default function FrontendLayout({
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
        {/* GA4 lives only in the public (frontend) group, never in the Payload admin. */}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
