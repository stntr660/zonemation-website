'use client'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export function SiteFooter() {
  const t = useTranslations('footer')

  return (
    <footer className="relative z-10 border-t border-white/10 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="text-white/30 text-lg">
          &copy; {new Date().getFullYear()} {t('copyright')}
        </p>
        <div className="flex gap-8 text-lg">
          <Link href="/privacy-policy" className="text-white/40 hover:text-[#a7d26d] transition-colors">{t('privacy')}</Link>
          <Link href="/terms-of-use" className="text-white/40 hover:text-[#a7d26d] transition-colors">{t('terms')}</Link>
          <Link href="/cookie-policy" className="text-white/40 hover:text-[#a7d26d] transition-colors">{t('cookies')}</Link>
          <Link href="/legal" className="text-white/40 hover:text-[#a7d26d] transition-colors">{t('legal')}</Link>
        </div>
      </div>
    </footer>
  )
}
