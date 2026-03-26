import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { PageShell } from '@/components/page-shell'

export const metadata: Metadata = {
  title: 'Privacy Policy - Zonemation',
  description: 'Zonemation privacy policy. How we collect, use, and protect your personal data.',
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

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('privacy')

  return (
    <PageShell title={t('title')} subtitle={t('lastUpdated')}>
      <div className="space-y-0">
        <Section title={t('s1Title')}>
          <p>{t('s1p1')}</p>
          <p>{t('s1p2')}</p>
        </Section>

        <Section title={t('s2Title')}>
          <p>{t('s2p1')}</p>
          <InfoBox>
            <p className="text-white font-medium">Zonemation Consulting Group</p>
            <p className="text-white/50 text-lg mt-1">Casablanca, Morocco</p>
            <p className="text-white/50 text-lg">Email: hello@zonemation.com</p>
            <p className="text-white/50 text-lg">{t('phone')}: +212 6 61 90 30 77</p>
          </InfoBox>
        </Section>

        <Section title={t('s3Title')}>
          <p className="text-[#a7d26d]/80 text-lg font-medium uppercase tracking-wider mb-2">{t('s3provided')}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="text-white/80">{t('s3contactInfo')}:</span> {t('s3contactInfoDesc')}</li>
            <li><span className="text-white/80">{t('s3professionalInfo')}:</span> {t('s3professionalInfoDesc')}</li>
            <li><span className="text-white/80">{t('s3communicationRecords')}:</span> {t('s3communicationRecordsDesc')}</li>
          </ul>
          <p className="text-[#a7d26d]/80 text-lg font-medium uppercase tracking-wider mb-2 mt-6">{t('s3automatic')}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="text-white/80">{t('s3deviceData')}:</span> {t('s3deviceDataDesc')}</li>
            <li><span className="text-white/80">{t('s3usageData')}:</span> {t('s3usageDataDesc')}</li>
            <li><span className="text-white/80">{t('s3networkData')}:</span> {t('s3networkDataDesc')}</li>
          </ul>
        </Section>

        <Section title={t('s4Title')}>
          <ul className="list-disc pl-5 space-y-2">
            <li>{t('s4item1')}</li>
            <li>{t('s4item2')}</li>
            <li>{t('s4item3')}</li>
            <li>{t('s4item4')}</li>
            <li>{t('s4item5')}</li>
          </ul>
        </Section>

        <Section title={t('s5Title')}>
          <p>{t('s5p1')}</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><span className="text-white/80">{t('s5consent')}</span> {t('s5consentDesc')}</li>
            <li><span className="text-white/80">{t('s5contract')}</span> {t('s5contractDesc')}</li>
            <li><span className="text-white/80">{t('s5legitimate')}</span> {t('s5legitimateDesc')}</li>
            <li><span className="text-white/80">{t('s5legal')}</span> {t('s5legalDesc')}</li>
          </ul>
        </Section>

        <Section title={t('s6Title')}>
          <p>{t('s6p1')}</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><span className="text-white/80">{t('s6providers')}:</span> {t('s6providersDesc')}</li>
            <li><span className="text-white/80">{t('s6authorities')}:</span> {t('s6authoritiesDesc')}</li>
            <li><span className="text-white/80">{t('s6transfers')}:</span> {t('s6transfersDesc')}</li>
          </ul>
        </Section>

        <Section title={t('s7Title')}>
          <p>{t('s7p1')}</p>
        </Section>

        <Section title={t('s8Title')}>
          <p>{t('s8p1')}</p>
        </Section>

        <Section title={t('s9Title')}>
          <p>{t('s9p1')}</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><span className="text-white/80">{t('s9access')}:</span> {t('s9accessDesc')}</li>
            <li><span className="text-white/80">{t('s9rectification')}:</span> {t('s9rectificationDesc')}</li>
            <li><span className="text-white/80">{t('s9deletion')}:</span> {t('s9deletionDesc')}</li>
            <li><span className="text-white/80">{t('s9opposition')}:</span> {t('s9oppositionDesc')}</li>
          </ul>
          <p className="mt-3">
            {t('s9contact')}{' '}
            <a href="mailto:hello@zonemation.com" className="text-[#a7d26d] hover:text-white transition-colors">hello@zonemation.com</a>.
            {' '}{t('s9response')}
          </p>
        </Section>

        <Section title={t('s10Title')}>
          <p>{t('s10p1')}</p>
        </Section>

        <Section title={t('s11Title')}>
          <p>{t('s11p1')}</p>
        </Section>

        <Section title={t('s12Title')}>
          <InfoBox>
            <p className="text-white font-medium">Zonemation Consulting Group</p>
            <p className="text-white/50 text-lg mt-1">Email: hello@zonemation.com</p>
            <p className="text-white/50 text-lg">{t('phone')}: +212 6 61 90 30 77</p>
          </InfoBox>
        </Section>
      </div>
    </PageShell>
  )
}
