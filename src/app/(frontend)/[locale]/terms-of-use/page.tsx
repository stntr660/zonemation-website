import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageShell } from '@/components/page-shell'

export const metadata: Metadata = {
  title: 'Terms of Use - Zonemation',
  description: 'Terms and conditions governing your use of the Zonemation website and services.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-3xl font-light text-white mb-4">{title}</h2>
      <div className="text-white/60 text-xl leading-[1.8] space-y-4">{children}</div>
    </section>
  )
}

export default async function TermsOfUsePage() {
  const t = await getTranslations('terms')

  return (
    <PageShell title={t('title')} subtitle={t('lastUpdated')}>
      <div className="space-y-0">
        <Section title={t('s1Title')}>
          <p>{t('s1p1')}</p>
        </Section>

        <Section title={t('s2Title')}>
          <p>{t('s2p1')}</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>{t('s2item1')}</li>
            <li>{t('s2item2')}</li>
            <li>{t('s2item3')}</li>
            <li>{t('s2item4')}</li>
            <li>{t('s2item5')}</li>
          </ul>
        </Section>

        <Section title={t('s3Title')}>
          <p>{t('s3p1')}</p>
          <p>{t('s3p2')}</p>
        </Section>

        <Section title={t('s4Title')}>
          <p>{t('s4p1')}</p>
        </Section>

        <Section title={t('s5Title')}>
          <p>{t('s5p1')}</p>
        </Section>

        <Section title={t('s6Title')}>
          <p>{t('s6p1')}</p>
        </Section>

        <Section title={t('s7Title')}>
          <p>{t('s7p1')}</p>
        </Section>

        <Section title={t('s8Title')}>
          <p>{t('s8p1')}</p>
        </Section>

        <Section title={t('s9Title')}>
          <p>{t('s9p1')}</p>
        </Section>

        <Section title={t('s10Title')}>
          <p>{t('s10p1')}</p>
        </Section>

        <Section title={t('s11Title')}>
          <p>
            {t('s11p1')}{' '}
            <a href="mailto:hello@zonemation.com" className="text-[#a7d26d] hover:text-white transition-colors">
              hello@zonemation.com
            </a>.
          </p>
        </Section>
      </div>
    </PageShell>
  )
}
