import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import QRCode from 'qrcode'

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const payload = await getPayload({ config })

  let invoice
  try {
    invoice = await payload.findByID({ collection: 'invoices', id })
  } catch {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zonemation.com'
  const verifyUrl = `${baseUrl}/fr/invoice/verify/${invoice.verificationToken}`
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 120,
    margin: 1,
    color: { dark: '#181a0e', light: '#ffffff' },
  })

  let logoBase64 = ''
  try {
    const logoPath = path.resolve(process.cwd(), 'public/Zonemation Logo Dark Mode.png')
    const logoBuffer = fs.readFileSync(logoPath)
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`
  } catch { /* skip */ }

  const items = (invoice.items || []) as Array<{
    description?: string
    quantity?: number
    unitPrice?: number
  }>
  const currency = invoice.currency || 'MAD'
  const subtotal = invoice.subtotal || 0
  const taxAmount = invoice.taxAmount || 0
  const total = invoice.total || 0
  const taxRate = invoice.taxRate ?? 20

  const signatureHtml = invoice.signatureData
    ? `<img src="${invoice.signatureData}" style="max-height:60px;max-width:200px;" />`
    : `<div style="width:200px;height:60px;border-bottom:1px solid #ddd;"></div>`

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Facture ${invoice.invoiceNumber}</title>
<style>
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    color: #2a2a2a;
    font-size: 12px;
    line-height: 1.5;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    background: #fff;
    position: relative;
  }

  /* ── HEADER (dark) ── */
  .header {
    background: #181a0e;
    padding: 26px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-logo img { height: 44px; }
  .header-right { text-align: right; }
  .header-title {
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 6px;
    color: #a7d26d;
  }
  .header-number {
    font-size: 12px;
    color: #a7d26d;
    font-family: 'Courier New', monospace;
    margin-top: 4px;
    letter-spacing: 1.5px;
    font-weight: 600;
  }

  /* ── META BAR (light green tint) ── */
  .meta-bar {
    background: #f5f7f0;
    padding: 11px 40px;
    display: flex;
    gap: 36px;
    border-bottom: 1px solid #e6e9df;
  }
  .meta-item {
    font-size: 10px;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .meta-item strong {
    color: #222;
    font-weight: 700;
    margin-left: 4px;
  }

  /* ── CONTENT (white) ── */
  .content { padding: 28px 40px; }

  /* ── PARTIES ── */
  .parties { display: flex; gap: 24px; margin-bottom: 28px; }
  .party {
    flex: 1;
    padding: 18px 20px;
    border: 1px solid #eee;
    border-radius: 6px;
    background: #fafafa;
  }
  .party-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: #6a8f2f;
    font-weight: 700;
    margin-bottom: 10px;
  }
  .party-name {
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #1a1a1a;
  }
  .party-detail {
    font-size: 11px;
    color: #555;
    line-height: 1.8;
  }
  .party-detail .label {
    color: #888;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-block;
    width: 55px;
  }

  /* ── TABLE ── */
  table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
  thead { background: transparent; }
  th {
    text-align: left;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #999;
    padding: 10px 14px;
    font-weight: 600;
    border-bottom: 2px solid #eee;
  }
  th.right { text-align: right; }
  td {
    padding: 11px 14px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 12px;
    color: #333;
    font-weight: 400;
  }
  td.right {
    text-align: right;
    font-family: 'Courier New', monospace;
    color: #444;
    font-weight: 500;
  }
  tr:nth-child(even) { background: #fafbf8; }

  /* ── TOTALS ── */
  .totals-wrapper { display: flex; justify-content: flex-end; margin-bottom: 28px; }
  .totals { width: 250px; }
  .totals-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    font-size: 12px;
    color: #666;
    font-weight: 500;
  }
  .totals-row .amount { font-family: 'Courier New', monospace; color: #444; font-weight: 600; }
  .totals-row.grand {
    border-top: 2px solid #181a0e;
    padding-top: 10px;
    margin-top: 6px;
    font-size: 17px;
    font-weight: 800;
    color: #181a0e;
  }
  .totals-row.grand .amount { color: #3d6b0e; font-weight: 800; }

  /* ── NOTES ── */
  .notes {
    background: #f5f7f0;
    padding: 14px 18px;
    border-radius: 4px;
    margin-bottom: 24px;
    border-left: 3px solid #a7d26d;
  }
  .notes-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #999;
    margin-bottom: 5px;
  }
  .notes-text { font-size: 11px; color: #666; }

  /* ── VERIFICATION ── */
  .verification {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 20px 0;
    border-top: 1px solid #eee;
    margin-top: 16px;
  }
  .qr-section { text-align: center; }
  .qr-label {
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #aaa;
    margin-bottom: 8px;
  }
  .signature-section { text-align: center; }
  .signature-label {
    font-size: 9px;
    color: #aaa;
    margin-top: 8px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  /* ── FOOTER (green) ── */
  .footer {
    background: #a7d26d;
    padding: 16px 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .footer-grid {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  .footer-label {
    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: rgba(24,26,14,0.45);
    font-weight: 700;
    margin-bottom: 3px;
  }
  .footer-value {
    font-size: 10px;
    color: #181a0e;
    font-weight: 600;
    line-height: 1.5;
  }
  .footer-brand {
    font-size: 12px;
    color: #181a0e;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 2px;
  }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { width: 100%; min-height: auto; }
    .footer { position: fixed; bottom: 0; }
  }
</style>
</head>
<body>
<div class="page">
  <!-- HEADER (dark) -->
  <div class="header">
    ${logoBase64 ? `<div class="header-logo"><img src="${logoBase64}" /></div>` : ''}
    <div class="header-right">
      <div class="header-title">FACTURE</div>
      <div class="header-number">${invoice.invoiceNumber}</div>
    </div>
  </div>

  <!-- META BAR -->
  <div class="meta-bar">
    <div class="meta-item">Date d'emission<strong>${invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString('fr-FR') : '—'}</strong></div>
    <div class="meta-item">Echeance<strong>${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString('fr-FR') : '—'}</strong></div>
    <div class="meta-item">Devise<strong>${currency}</strong></div>
    <div class="meta-item">Statut<strong>${(invoice.status || 'draft').toUpperCase()}</strong></div>
  </div>

  <!-- CONTENT (white) -->
  <div class="content">
    <div class="parties">
      <div class="party">
        <div class="party-label">Emetteur</div>
        <div class="party-name">${invoice.senderName || '—'}</div>
        <div class="party-detail">
          ${invoice.senderAddress ? `<div><span class="label">Adresse</span> ${invoice.senderAddress}</div>` : ''}
          ${invoice.senderCity ? `<div><span class="label">Ville</span> ${invoice.senderCity}</div>` : ''}
          ${invoice.senderEmail ? `<div><span class="label">Email</span> ${invoice.senderEmail}</div>` : ''}
          ${invoice.senderPhone ? `<div><span class="label">Tel.</span> ${invoice.senderPhone}</div>` : ''}
          ${invoice.senderIce ? `<div><span class="label">ICE</span> ${invoice.senderIce}</div>` : ''}
        </div>
      </div>
      <div class="party">
        <div class="party-label">Facturer a</div>
        <div class="party-name">${invoice.clientName || '—'}</div>
        <div class="party-detail">
          ${invoice.clientAddress ? `<div><span class="label">Adresse</span> ${invoice.clientAddress}</div>` : ''}
          ${invoice.clientCity ? `<div><span class="label">Ville</span> ${invoice.clientCity}</div>` : ''}
          ${invoice.clientEmail ? `<div><span class="label">Email</span> ${invoice.clientEmail}</div>` : ''}
          ${invoice.clientIce ? `<div><span class="label">ICE</span> ${invoice.clientIce}</div>` : ''}
        </div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th class="right">Quantite</th>
          <th class="right">Prix unitaire</th>
          <th class="right">Total</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .filter((item) => item.description)
          .map(
            (item) => `
          <tr>
            <td>${item.description}</td>
            <td class="right">${item.quantity || 0}</td>
            <td class="right">${fmt(item.unitPrice || 0, currency)}</td>
            <td class="right">${fmt((item.quantity || 0) * (item.unitPrice || 0), currency)}</td>
          </tr>`,
          )
          .join('')}
      </tbody>
    </table>

    <div class="totals-wrapper">
      <div class="totals">
        <div class="totals-row">
          <span>Sous-total</span>
          <span class="amount">${fmt(subtotal, currency)}</span>
        </div>
        <div class="totals-row">
          <span>TVA (${taxRate}%)</span>
          <span class="amount">${fmt(taxAmount, currency)}</span>
        </div>
        <div class="totals-row grand">
          <span>Total</span>
          <span class="amount">${fmt(total, currency)}</span>
        </div>
      </div>
    </div>

    ${invoice.notes ? `
    <div class="notes">
      <div class="notes-label">Notes</div>
      <div class="notes-text">${invoice.notes}</div>
    </div>` : ''}

    <div class="verification">
      <div class="qr-section">
        <div class="qr-label">Verification</div>
        <img src="${qrDataUrl}" width="100" height="100" />
      </div>
      <div class="signature-section">
        ${signatureHtml}
        <div class="signature-label">Signature autorisee</div>
      </div>
    </div>
  </div>

  <!-- FOOTER (dark) -->
  <div class="footer">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">${invoice.senderName || 'Zonemation Consulting Group'}</div>
        <div class="footer-value">${invoice.senderAddress || ''}${invoice.senderCity ? ', ' + invoice.senderCity : ''}</div>
      </div>
      <div>
        <div class="footer-label">ICE</div>
        <div class="footer-value">${invoice.senderIce || '—'}</div>
      </div>
      <div>
        <div class="footer-label">Telephone</div>
        <div class="footer-value">${invoice.senderPhone || '—'}</div>
      </div>
      <div>
        <div class="footer-label">Email</div>
        <div class="footer-value">${invoice.senderEmail || '—'}</div>
      </div>
    </div>
  </div>
</div>

<script>window.onload = function() { window.focus(); window.print(); }</script>
</body>
</html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
