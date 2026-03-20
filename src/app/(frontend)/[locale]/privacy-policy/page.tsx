import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'

export const metadata: Metadata = {
  title: 'Privacy Policy - Zonemation',
  description: 'Zonemation privacy policy. How we collect, use, and protect your personal data.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-[1.4rem] font-light text-white mb-4">{title}</h2>
      <div className="text-white/60 text-[1.05rem] leading-[1.8] space-y-4">{children}</div>
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

export default function PrivacyPolicyPage() {
  return (
    <PageShell title="Privacy Policy" subtitle="Last updated: March 9, 2026">
      <div className="space-y-0">
        <Section title="1. Introduction">
          <p>
            Zonemation Consulting Group (&ldquo;Zonemation&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
            is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website zonemation.com or engage with our services.
          </p>
          <p>
            Zonemation is established under Moroccan law and complies with Law No. 09-08 on the Protection of
            Individuals with Regard to the Processing of Personal Data, as enforced by the CNDP.
          </p>
        </Section>

        <Section title="2. Data Controller">
          <p>The data controller responsible for your personal data is:</p>
          <InfoBox>
            <p className="text-white font-medium">Zonemation Consulting Group</p>
            <p className="text-white/50 text-[0.95rem] mt-1">Casablanca, Morocco</p>
            <p className="text-white/50 text-[0.95rem]">Email: hello@zonemation.com</p>
            <p className="text-white/50 text-[0.95rem]">Phone: +212 6 61 90 30 77</p>
          </InfoBox>
        </Section>

        <Section title="3. Information We Collect">
          <p className="text-[#a7d26d]/80 text-[0.95rem] font-medium uppercase tracking-wider mb-2">Information You Provide</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="text-white/80">Contact information:</span> name, email, phone, company name when you submit our contact form.</li>
            <li><span className="text-white/80">Professional information:</span> job title, company, industry, and project details.</li>
            <li><span className="text-white/80">Communication records:</span> correspondence and interactions with us.</li>
          </ul>
          <p className="text-[#a7d26d]/80 text-[0.95rem] font-medium uppercase tracking-wider mb-2 mt-6">Collected Automatically</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="text-white/80">Device data:</span> browser type, operating system, device type.</li>
            <li><span className="text-white/80">Usage data:</span> pages visited, time spent, referring URLs.</li>
            <li><span className="text-white/80">Network data:</span> IP address, approximate geographic location.</li>
          </ul>
        </Section>

        <Section title="4. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-2">
            <li>Responding to your inquiries and providing requested services.</li>
            <li>Delivering consulting services and managing client relationships.</li>
            <li>Sending relevant communications about our services (with your consent).</li>
            <li>Improving our website, services, and user experience.</li>
            <li>Complying with legal obligations under Moroccan law.</li>
          </ul>
        </Section>

        <Section title="5. Legal Basis for Processing">
          <p>In accordance with Law No. 09-08, we process your data based on:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><span className="text-white/80">Your consent</span> when you submit forms or opt into communications.</li>
            <li><span className="text-white/80">Contractual necessity</span> to perform consulting services.</li>
            <li><span className="text-white/80">Legitimate interests</span> to improve our services and maintain security.</li>
            <li><span className="text-white/80">Legal compliance</span> to fulfill obligations under Moroccan legislation.</li>
          </ul>
        </Section>

        <Section title="6. Data Sharing and Disclosure">
          <p>We do not sell your personal data. We may share your information with:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><span className="text-white/80">Service providers:</span> hosting, analytics, and communication tools.</li>
            <li><span className="text-white/80">Legal authorities:</span> when required by Moroccan law.</li>
            <li><span className="text-white/80">Business transfers:</span> in connection with a merger or acquisition.</li>
          </ul>
        </Section>

        <Section title="7. International Data Transfers">
          <p>
            Some service providers may be located outside Morocco. We ensure appropriate safeguards in compliance
            with CNDP requirements, including contractual clauses guaranteeing adequate data protection.
          </p>
        </Section>

        <Section title="8. Data Retention">
          <p>
            Contact form submissions are retained for 24 months. Client engagement data is retained for the
            duration of our business relationship plus 5 years as required by Moroccan commercial law.
          </p>
        </Section>

        <Section title="9. Your Rights">
          <p>Under Law No. 09-08, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><span className="text-white/80">Access:</span> request a copy of your personal data.</li>
            <li><span className="text-white/80">Rectification:</span> correct inaccurate or incomplete data.</li>
            <li><span className="text-white/80">Deletion:</span> request erasure of your data.</li>
            <li><span className="text-white/80">Opposition:</span> object to processing for legitimate reasons.</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, contact us at{' '}
            <a href="mailto:hello@zonemation.com" className="text-[#a7d26d] hover:text-white transition-colors">hello@zonemation.com</a>.
            We will respond within 30 days.
          </p>
        </Section>

        <Section title="10. Security">
          <p>
            We implement appropriate technical and organizational measures including encrypted communications (TLS/SSL),
            access controls, regular security assessments, and secure data storage.
          </p>
        </Section>

        <Section title="11. Children&apos;s Privacy">
          <p>
            Our services are not directed to individuals under 18. We do not knowingly collect data from children.
          </p>
        </Section>

        <Section title="12. Contact & Complaints">
          <InfoBox>
            <p className="text-white font-medium">Zonemation Consulting Group</p>
            <p className="text-white/50 text-[0.95rem] mt-1">Email: hello@zonemation.com</p>
            <p className="text-white/50 text-[0.95rem]">Phone: +212 6 61 90 30 77</p>
          </InfoBox>
          <p className="mt-4">
            You may also lodge a complaint with the CNDP at{' '}
            <a href="https://www.cndp.ma" target="_blank" rel="noopener noreferrer" className="text-[#a7d26d] hover:text-white transition-colors">
              www.cndp.ma
            </a>.
          </p>
        </Section>
      </div>
    </PageShell>
  )
}
