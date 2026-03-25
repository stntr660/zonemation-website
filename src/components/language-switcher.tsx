'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { useState, useRef, useEffect } from 'react'
import { localeNames, type Locale } from '@/i18n/config'

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-white/50 hover:text-[#a7d26d] transition-colors duration-200"
        aria-label="Change language"
      >
        <GlobeIcon className="w-5 h-5" />
        <span className="text-base uppercase font-mono tracking-wide">{locale}</span>
      </button>
      {open && (
        <div className="absolute top-full mt-2 end-0 bg-[#252819] border border-white/10 py-1 min-w-[150px] z-50 shadow-xl">
          {(['fr', 'en', 'ar'] as const).map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={`w-full text-start px-4 py-2.5 text-base hover:bg-white/5 transition-colors duration-150 ${
                l === locale ? 'text-[#a7d26d]' : 'text-white/60'
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
