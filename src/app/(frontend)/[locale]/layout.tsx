import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { isRtl, type Locale } from '@/i18n/config'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) notFound()

  const messages = await getMessages()
  const dir = isRtl(locale as Locale) ? 'rtl' : 'ltr'
  const fontClass = locale === 'ar' ? 'font-arabic' : 'font-sans'

  return (
    <div dir={dir} className={fontClass}>
      <NextIntlClientProvider messages={messages}>
        <div className="min-h-screen bg-[#181a0e] flex flex-col">
          <SiteHeader />
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <SiteFooter />
        </div>
      </NextIntlClientProvider>
    </div>
  )
}
