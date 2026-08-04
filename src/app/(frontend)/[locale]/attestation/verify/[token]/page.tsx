import { notFound } from 'next/navigation'
import { attestations } from '@/lib/attestations'

export default async function VerifyAttestationPage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>
}) {
  const { token } = await params
  const attestation = attestations[token]

  if (!attestation) notFound()

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="border border-[#a7d26d]/20 rounded-lg p-8 bg-white/[0.02]">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-6 h-6 text-[#a7d26d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <h1 className="text-xl text-white/90 font-light">Attestation verifiee</h1>
        </div>

        <p className="text-white/40 text-base mb-8">
          Ce document est une attestation de travail authentique emise par Zonemation.
        </p>

        <div className="space-y-4 text-base">
          <div className="flex justify-between border-b border-white/[0.06] pb-3">
            <span className="text-white/40">Reference</span>
            <span className="text-white/80 font-mono">{attestation.number}</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-3">
            <span className="text-white/40">Date d&apos;emission</span>
            <span className="text-white/80">
              {new Date(attestation.issueDate).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-3">
            <span className="text-white/40">Salarie</span>
            <span className="text-white/80">{attestation.employeeName}</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-3">
            <span className="text-white/40">CIN</span>
            <span className="text-white/80 font-mono">{attestation.cin}</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-3">
            <span className="text-white/40">CNSS</span>
            <span className="text-white/80 font-mono">{attestation.cnss}</span>
          </div>
          <div className="flex justify-between pb-3">
            <span className="text-white/40">Poste</span>
            <span className="text-white/80 text-right max-w-[60%]">{attestation.position}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
