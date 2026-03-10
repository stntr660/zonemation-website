import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#181a0e] flex flex-col">
      <SiteHeader />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
