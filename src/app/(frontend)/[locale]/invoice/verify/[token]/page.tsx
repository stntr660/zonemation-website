import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function VerifyInvoicePage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>
}) {
  const { token } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'invoices',
    where: { verificationToken: { equals: token } },
    limit: 1,
  })

  if (docs.length === 0) notFound()

  const invoice = docs[0]

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: invoice.currency || 'MAD',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="border border-[#a7d26d]/20 rounded-lg p-8 bg-white/[0.02]">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-6 h-6 text-[#a7d26d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <h1 className="text-xl text-white/90 font-light">Facture verifiee</h1>
        </div>

        <p className="text-white/40 text-base mb-8">
          Ce document est une facture authentique emise par Zonemation Consulting Group.
        </p>

        <div className="space-y-4 text-base">
          <div className="flex justify-between border-b border-white/[0.06] pb-3">
            <span className="text-white/40">Numero</span>
            <span className="text-white/80 font-mono">{invoice.invoiceNumber}</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-3">
            <span className="text-white/40">Date d&apos;emission</span>
            <span className="text-white/80">
              {invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString('fr-FR') : '—'}
            </span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-3">
            <span className="text-white/40">Client</span>
            <span className="text-white/80">{invoice.clientName || '—'}</span>
          </div>
          <div className="flex justify-between border-b border-white/[0.06] pb-3">
            <span className="text-white/40">Montant total</span>
            <span className="text-[#a7d26d] font-mono font-medium">
              {formatCurrency(invoice.total || 0)}
            </span>
          </div>
          <div className="flex justify-between pb-3">
            <span className="text-white/40">Statut</span>
            <span className="text-white/80 capitalize">{invoice.status || 'draft'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
