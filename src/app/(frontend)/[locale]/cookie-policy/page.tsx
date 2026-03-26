import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageShell } from '@/components/page-shell'

export const metadata: Metadata = {
  title: 'Cookie Policy - Zonemation',
  description: 'How Zonemation uses cookies and similar tracking technologies on our website.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-light text-white mb-4">{title}</h2>
      <div className="text-white/60 text-xl leading-[1.8] space-y-4">{children}</div>
    </section>
  )
}

function CookieCard({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-5">
      <h3 className="text-white font-medium mb-1">{title}</h3>
      <p className="text-[#a7d26d]/60 text-base uppercase tracking-wider mb-2">{label}</p>
      <p className="text-white/60 text-lg">{children}</p>
    </div>
  )
}

export default async function CookiePolicyPage() {
  const t = await getTranslations('cookies')

  return (
    <PageShell title={t('title')} subtitle={t('lastUpdated')}>
      <div className="space-y-0">
        <Section title={t('s1Title')}>
          <p>{t('s1p1')}</p>
        </Section>

        <Section title={t('s2Title')}>
          <div className="space-y-4">
            <CookieCard title={t('s2essentialTitle')} label={t('s2essentialLabel')}>
              {t('s2essentialDesc')}
            </CookieCard>

            <CookieCard title={t('s2preferenceTitle')} label={t('s2preferenceLabel')}>
              {t('s2preferenceDesc')}
            </CookieCard>

            <CookieCard title={t('s2analyticsTitle')} label={t('s2analyticsLabel')}>
              {t('s2analyticsDesc')}
            </CookieCard>
          </div>
        </Section>

        <Section title={t('s3Title')}>
          <div className="overflow-x-auto">
            <table className="w-full text-lg">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-white/80 font-medium">{t('s3colCookie')}</th>
                  <th className="text-left py-3 pr-4 text-white/80 font-medium">{t('s3colType')}</th>
                  <th className="text-left py-3 pr-4 text-white/80 font-medium">{t('s3colDuration')}</th>
                  <th className="text-left py-3 text-white/80 font-medium">{t('s3colPurpose')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-base text-[#a7d26d]">theme</td>
                  <td className="py-3 pr-4">{t('s3typePreference')}</td>
                  <td className="py-3 pr-4">{t('s3duration1year')}</td>
                  <td className="py-3">{t('s3purposeTheme')}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-base text-[#a7d26d]">payload-token</td>
                  <td className="py-3 pr-4">{t('s3typeEssential')}</td>
                  <td className="py-3 pr-4">{t('s3durationSession')}</td>
                  <td className="py-3">{t('s3purposeAuth')}</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-base text-[#a7d26d]">cookie-consent</td>
                  <td className="py-3 pr-4">{t('s3typeEssential')}</td>
                  <td className="py-3 pr-4">{t('s3duration1year')}</td>
                  <td className="py-3">{t('s3purposeConsent')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title={t('s4Title')}>
          <p>{t('s4p1')}</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>{t('s4item1')}</li>
            <li>{t('s4item2')}</li>
            <li>{t('s4item3')}</li>
            <li>{t('s4item4')}</li>
            <li>{t('s4item5')}</li>
          </ul>
          <p>{t('s4warning')}</p>
        </Section>

        <Section title={t('s5Title')}>
          <p>{t('s5p1')}</p>
        </Section>

        <Section title={t('s6Title')}>
          <p>
            {t('s6p1')}{' '}
            <a href="mailto:hello@zonemation.com" className="text-[#a7d26d] hover:text-white transition-colors">
              hello@zonemation.com
            </a>.
          </p>
        </Section>
      </div>
    </PageShell>
  )
}
