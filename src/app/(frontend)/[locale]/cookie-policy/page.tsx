import type { Metadata } from 'next'
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

export default function CookiePolicyPage() {
  return (
    <PageShell title="Cookie Policy" subtitle="Last updated: March 9, 2026">
      <div className="space-y-0">
        <Section title="1. What Are Cookies">
          <p>
            Cookies are small text files placed on your device when you visit a website. They are widely used to
            make websites work efficiently, provide analytics, and enhance user experience.
          </p>
        </Section>

        <Section title="2. Types of Cookies We Use">
          <div className="space-y-4">
            <CookieCard title="Essential Cookies" label="Required for the site to function">
              These cookies are necessary for core functionality such as security, session management,
              and accessibility preferences. You cannot opt out of these cookies.
            </CookieCard>

            <CookieCard title="Preference Cookies" label="Remember your settings">
              These cookies remember your preferences such as language and theme (dark/light mode),
              providing a more personalized experience.
            </CookieCard>

            <CookieCard title="Analytics Cookies" label="Help us understand usage">
              These cookies help us understand how visitors interact with our website by collecting
              and reporting information anonymously.
            </CookieCard>
          </div>
        </Section>

        <Section title="3. Specific Cookies Used">
          <div className="overflow-x-auto">
            <table className="w-full text-lg">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-white/80 font-medium">Cookie</th>
                  <th className="text-left py-3 pr-4 text-white/80 font-medium">Type</th>
                  <th className="text-left py-3 pr-4 text-white/80 font-medium">Duration</th>
                  <th className="text-left py-3 text-white/80 font-medium">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-base text-[#a7d26d]">theme</td>
                  <td className="py-3 pr-4">Preference</td>
                  <td className="py-3 pr-4">1 year</td>
                  <td className="py-3">Dark/light mode preference</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-base text-[#a7d26d]">payload-token</td>
                  <td className="py-3 pr-4">Essential</td>
                  <td className="py-3 pr-4">Session</td>
                  <td className="py-3">Admin authentication</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-4 font-mono text-base text-[#a7d26d]">cookie-consent</td>
                  <td className="py-3 pr-4">Essential</td>
                  <td className="py-3 pr-4">1 year</td>
                  <td className="py-3">Cookie consent choice</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="4. Managing Cookies">
          <p>You can control cookies through your browser settings:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>View and delete cookies stored on your device.</li>
            <li>Block third-party cookies.</li>
            <li>Block cookies from specific sites.</li>
            <li>Block all cookies.</li>
            <li>Delete all cookies when you close your browser.</li>
          </ul>
          <p>Blocking essential cookies may affect website functionality.</p>
        </Section>

        <Section title="5. Legal Framework">
          <p>
            Our use of cookies complies with Moroccan Law No. 09-08 on the Protection of Individuals with
            Regard to the Processing of Personal Data.
          </p>
        </Section>

        <Section title="6. Contact">
          <p>
            For questions about our use of cookies, contact us at{' '}
            <a href="mailto:hello@zonemation.com" className="text-[#a7d26d] hover:text-white transition-colors">
              hello@zonemation.com
            </a>.
          </p>
        </Section>
      </div>
    </PageShell>
  )
}
