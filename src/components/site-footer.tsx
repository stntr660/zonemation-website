import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="text-white/30 text-[0.9rem]">
          &copy; {new Date().getFullYear()} Zonemation Consulting Group
        </p>
        <div className="flex gap-8 text-[0.9rem]">
          <Link href="/privacy-policy" className="text-white/40 hover:text-[#a7d26d] transition-colors">Privacy</Link>
          <Link href="/terms-of-use" className="text-white/40 hover:text-[#a7d26d] transition-colors">Terms</Link>
          <Link href="/cookie-policy" className="text-white/40 hover:text-[#a7d26d] transition-colors">Cookies</Link>
          <Link href="/legal" className="text-white/40 hover:text-[#a7d26d] transition-colors">Legal</Link>
        </div>
      </div>
    </footer>
  )
}
