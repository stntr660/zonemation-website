import type { Metadata } from 'next'
import { PageShell } from '@/components/page-shell'

export const metadata: Metadata = {
  title: 'Mentions Legales - Zonemation',
  description: 'Legal notice and regulatory information for Zonemation Consulting Group.',
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

export default function LegalPage() {
  return (
    <PageShell title="Mentions Legales" subtitle="Last updated: March 9, 2026">
      <div className="space-y-0">
        <Section title="1. Editeur du Site">
          <InfoBox>
            <p className="text-white font-medium mb-2">Zonemation Consulting Group</p>
            <div className="space-y-1 text-[0.95rem]">
              <p><span className="text-white/80">Forme juridique :</span> SARL</p>
              <p><span className="text-white/80">Siege social :</span> Casablanca, Maroc</p>
              <p><span className="text-white/80">Telephone :</span> +212 6 61 90 30 77</p>
              <p><span className="text-white/80">Email :</span> hello@zonemation.com</p>
              <p><span className="text-white/80">Site web :</span> zonemation.com</p>
            </div>
          </InfoBox>
        </Section>

        <Section title="2. Directeur de la Publication">
          <p>
            Le directeur de la publication du site zonemation.com est le representant legal de
            Zonemation Consulting Group.
          </p>
        </Section>

        <Section title="3. Hebergement">
          <p>
            Le site est heberge par des services d&apos;hebergement cloud professionnels assurant
            la securite, la disponibilite et la performance du site.
          </p>
        </Section>

        <Section title="4. Propriete Intellectuelle">
          <p>
            L&apos;ensemble du contenu du site zonemation.com est protege par les lois marocaines et internationales
            relatives a la propriete intellectuelle, notamment la Loi n&deg; 2-00 relative aux droits d&apos;auteur
            et droits voisins.
          </p>
          <p>
            Toute reproduction, representation, modification, publication ou exploitation de tout ou partie
            du contenu est interdite sans l&apos;autorisation ecrite prealable de Zonemation.
          </p>
        </Section>

        <Section title="5. Protection des Donnees Personnelles">
          <p>
            Conformement a la Loi n&deg; 09-08, Zonemation s&apos;engage a respecter la confidentialite
            des donnees personnelles qui lui sont communiquees.
          </p>
          <p>
            Pour plus d&apos;informations, consultez notre{' '}
            <a href="/privacy-policy" className="text-[#a7d26d] hover:text-white transition-colors">
              Politique de Confidentialite
            </a>.
          </p>
        </Section>

        <Section title="6. Declaration CNDP">
          <p>
            Les traitements de donnees a caractere personnel realises par Zonemation font l&apos;objet d&apos;une
            declaration aupres de la CNDP conformement a la legislation en vigueur.
          </p>
        </Section>

        <Section title="7. Cookies">
          <p>
            Le site utilise des cookies pour ameliorer l&apos;experience utilisateur. Consultez notre{' '}
            <a href="/cookie-policy" className="text-[#a7d26d] hover:text-white transition-colors">
              Politique de Cookies
            </a>.
          </p>
        </Section>

        <Section title="8. Limitation de Responsabilite">
          <p>
            Zonemation s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusees sur ce site.
            Toutefois, Zonemation ne peut garantir l&apos;exactitude ou l&apos;exhaustivite des informations
            et decline toute responsabilite pour toute imprecision ou omission.
          </p>
        </Section>

        <Section title="9. Droit Applicable">
          <p>
            Les presentes mentions legales sont regies par le droit marocain. Tout litige sera soumis a la
            competence exclusive des tribunaux de Casablanca, Maroc.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Pour toute question :{' '}
            <a href="mailto:hello@zonemation.com" className="text-[#a7d26d] hover:text-white transition-colors">
              hello@zonemation.com
            </a>
          </p>
        </Section>
      </div>
    </PageShell>
  )
}
