import type { Metadata } from 'next'
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

export default function TermsOfUsePage() {
  return (
    <PageShell title="Terms of Use" subtitle="Last updated: March 9, 2026">
      <div className="space-y-0">
        <Section title="1. Acceptance of Terms">
          <p>
            By accessing and using the Zonemation website, you agree to be bound by these Terms of Use.
            If you do not agree, please do not use the Site. Zonemation reserves the right to modify these
            terms at any time. Continued use after changes constitutes acceptance.
          </p>
        </Section>

        <Section title="2. Use of the Site">
          <p>You agree to use this Site only for lawful purposes and in a manner that does not:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>Infringe the rights of any third party.</li>
            <li>Restrict or inhibit any other user from using the Site.</li>
            <li>Violate any applicable local, national, or international law.</li>
            <li>Attempt to gain unauthorized access to any part of the Site.</li>
            <li>Transmit any malicious code, viruses, or harmful data.</li>
          </ul>
        </Section>

        <Section title="3. Intellectual Property">
          <p>
            All content on this Site is the property of Zonemation or its licensors and is protected by
            Moroccan and international intellectual property laws, including Law No. 2-00 on Copyright
            and Related Rights.
          </p>
          <p>
            You may not reproduce, distribute, modify, display, publish, or create derivative works from
            any content without prior written consent.
          </p>
        </Section>

        <Section title="4. Trademarks">
          <p>
            &ldquo;Zonemation&rdquo;, the Zonemation logo, and all related names, logos, and designs are
            trademarks of Zonemation Consulting Group. You may not use such marks without prior written permission.
          </p>
        </Section>

        <Section title="5. Content and Insights">
          <p>
            Articles, reports, case studies, and other content are provided for general informational purposes
            only and do not constitute professional advice. Any reliance on such content is at your own risk.
          </p>
        </Section>

        <Section title="6. Third-Party Links">
          <p>
            This Site may contain links to third-party websites. Zonemation has no control over those sites
            and does not accept responsibility for any loss arising from your use of them.
          </p>
        </Section>

        <Section title="7. Disclaimer of Warranties">
          <p>
            The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind.
            Zonemation does not warrant that the Site will be uninterrupted, error-free, or free of harmful components.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            To the fullest extent permitted by Moroccan law, Zonemation shall not be liable for any indirect,
            incidental, special, or consequential damages resulting from your use of the Site.
          </p>
        </Section>

        <Section title="9. Indemnification">
          <p>
            You agree to indemnify and hold harmless Zonemation and its officers, directors, employees, and agents
            from any claims arising from your use of the Site or violation of these Terms.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms are governed by the laws of the Kingdom of Morocco. Any disputes shall be subject to the
            exclusive jurisdiction of the courts of Casablanca, Morocco.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:hello@zonemation.com" className="text-[#a7d26d] hover:text-white transition-colors">
              hello@zonemation.com
            </a>.
          </p>
        </Section>
      </div>
    </PageShell>
  )
}
