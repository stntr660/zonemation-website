'use client'

import { useTranslations } from 'next-intl'

export type Store = 'appStore' | 'googlePlay'

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden>
      <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-2.99-.79-1.54.02-2.96.9-3.75 2.27-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.38-.92-2.4-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28z" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <path fill="#34A853" d="M3.6 2.2 13.4 12l-9.8 9.8c-.36-.2-.6-.6-.6-1.07V3.27c0-.47.24-.87.6-1.07z" />
      <path fill="#FBBC04" d="m16.8 8.6-3.4 3.4 3.4 3.4 3.83-2.17c.98-.56.98-1.9 0-2.46L16.8 8.6z" />
      <path fill="#4285F4" d="M3.6 2.2c.3-.17.68-.2 1.04 0L16.8 8.6 13.4 12 3.6 2.2z" />
      <path fill="#EA4335" d="M13.4 12l3.4 3.4-12.16 6.4c-.36.2-.74.17-1.04 0L13.4 12z" />
    </svg>
  )
}

export function StoreBadges({ stores }: { stores: { store: Store; href: string }[] }) {
  const t = useTranslations('home.stores')

  return (
    <div className="flex flex-wrap gap-3" dir="ltr">
      {stores.map(({ store, href }) => (
        <a
          key={store}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-black/40 px-4 py-2 text-white hover:border-[#a7d26d] hover:-translate-y-0.5 transition-all duration-300"
        >
          {store === 'appStore' ? <AppleIcon /> : <PlayIcon />}
          <span className="flex flex-col leading-tight text-start">
            <span className="text-[10px] uppercase tracking-wide text-white/60">
              {store === 'appStore' ? t('appStoreLine') : t('googlePlayLine')}
            </span>
            <span className="text-base font-medium">{store === 'appStore' ? 'App Store' : 'Google Play'}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
