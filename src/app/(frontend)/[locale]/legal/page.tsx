import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageShell } from '@/components/page-shell'

export const metadata: Metadata = {
  title: 'Legal Notice - Zonemation',
  description: 'Legal notice and regulatory information for Zonemation Consulting Group.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-light text-white mb-4">{title}</h2>
      <div className="text-white/60 text-xl leading-[1.8] space-y-4">{children}</div>
    </section>
  )
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-5 mt-4">
      {children}
    </div>
  )
}

export default async function LegalPage() {
  const t = await getTranslations('legal')

  return (
    <PageShell title={t('title')} subtitle={t('lastUpdated')}>
      <div className="space-y-0">
        <Section title={t('s1Title')}>
          <InfoBox>
            <p className="text-white font-medium mb-2">Zonemation Consulting Group</p>
            <div className="space-y-1 text-lg">
              <p><span className="text-white/80">{t('s1legalForm')}:</span> {t('s1legalFormValue')}</p>
              <p><span className="text-white/80">{t('s1headquarters')}:</span> {t('s1headquartersValue')}</p>
              <p><span className="text-white/80">{t('s1phone')}:</span> +212 6 61 90 30 77</p>
              <p><span className="text-white/80">{t('s1email')}:</span> hello@zonemation.com</p>
              <p><span className="text-white/80">{t('s1website')}:</span> zonemation.com</p>
            </div>
          </InfoBox>
        </Section>

        <Section title={t('s2Title')}>
          <p>{t('s2p1')}</p>
        </Section>

        <Section title={t('s3Title')}>
          <p>{t('s3p1')}</p>
        </Section>

        <Section title={t('s4Title')}>
          <p>{t('s4p1')}</p>
          <p>{t('s4p2')}</p>
        </Section>

        <Section title={t('s5Title')}>
          <p>{t('s5p1')}</p>
          <p>
            {t('s5p2')}{' '}
            <a href="/privacy-policy" className="text-[#a7d26d] hover:text-white transition-colors">
              {t('s5privacyLink')}
            </a>.
          </p>
        </Section>

        <Section title={t('s6Title')}>
          <p>
            {t('s6p1')}{' '}
            <a href="/cookie-policy" className="text-[#a7d26d] hover:text-white transition-colors">
              {t('s6cookieLink')}
            </a>.
          </p>
        </Section>

        <Section title={t('s7Title')}>
          <p>{t('s7p1')}</p>
        </Section>

        <Section title={t('s8Title')}>
          <p>{t('s8p1')}</p>
        </Section>

        <Section title={t('s9Title')}>
          <p>
            {t('s9p1')}{' '}
            <a href="mailto:hello@zonemation.com" className="text-[#a7d26d] hover:text-white transition-colors">
              hello@zonemation.com
            </a>
          </p>
        </Section>
      </div>
    </PageShell>
  )
}
