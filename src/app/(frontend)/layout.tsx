import '../globals.css'
import { ThemeProvider } from '@/lib/theme-provider'
import { AnimatedFavicon } from '@/components/animated-favicon'

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
      </body>
    </html>
  )
}
