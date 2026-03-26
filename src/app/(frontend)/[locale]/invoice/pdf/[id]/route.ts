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

  // Load stamp from Site Settings
  let stampBase64 = ''
  try {
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 3 })
    const billing = (settings as any)?.billing
    let stamp = billing?.stamp

    // If stamp is an ID, fetch the media doc
    if (stamp && typeof stamp === 'number') {
      stamp = await payload.findByID({ collection: 'media', id: stamp })
    }

    if (stamp && typeof stamp === 'object' && stamp.filename) {
      // Try local file first
      const stampPath = path.resolve(process.cwd(), `media/${stamp.filename}`)
      if (fs.existsSync(stampPath)) {
        const stampBuffer = fs.readFileSync(stampPath)
        const ext = stamp.mimeType?.includes('png') ? 'png' : 'jpeg'
        stampBase64 = `data:image/${ext};base64,${stampBuffer.toString('base64')}`
      }
    }
  } catch (err) {
    console.error('Stamp load error:', err)
  }

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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Poppins', sans-serif;
    color: #333;
    font-size: 12px;
    line-height: 1.5;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 210mm;
    height: 297mm;
    margin: 0 auto;
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .content {
    flex: 1;
  }

  /* ── Header ── */
  .header {
    background: #181a0e;
    padding: 24px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-logo img { height: 40px; }
  .header-right { text-align: right; }
  .header-title {
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 5px;
    color: #a7d26d;
  }
  .header-number {
    font-size: 12px;
    color: rgba(167,210,109,0.7);
    font-family: 'JetBrains Mono', monospace;
    margin-top: 4px;
    letter-spacing: 1px;
    font-weight: 500;
  }

  /* ── Meta bar ── */
  .meta-bar {
    background: #f5f7f0;
    padding: 9px 40px;
    display: flex;
    gap: 32px;
    border-bottom: 1px solid #e8ebdf;
  }
  .meta-item {
    font-size: 10px;
    color: #999;
    letter-spacing: 0.3px;
  }
  .meta-item strong {
    color: #333;
    font-weight: 600;
    margin-left: 6px;
  }

  /* ── Content ── */
  .content { padding: 24px 40px; flex: 1; }

  /* ── Parties ── */
  .parties { display: flex; gap: 20px; margin-bottom: 24px; }
  .party {
    flex: 1;
    padding: 16px 18px;
    border: 1px solid #eee;
    border-radius: 6px;
    background: #fafafa;
  }
  .party-label {
    font-size: 9px;
    letter-spacing: 1.5px;
    color: #6a8f2f;
    font-weight: 600;
    margin-bottom: 8px;
    text-transform: uppercase;
  }
  .party-name {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    color: #1a1a1a;
  }
  .party-detail {
    font-size: 11px;
    color: #555;
    line-height: 1.7;
  }
  .party-detail div {
    margin-bottom: 2px;
  }

  /* ── Table ── */
  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  th {
    text-align: left;
    font-size: 10px;
    letter-spacing: 0.3px;
    color: #999;
    padding: 8px 14px;
    font-weight: 500;
    border-bottom: 2px solid #eee;
  }
  th.right { text-align: right; }
  td {
    padding: 9px 14px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 12px;
    color: #333;
    font-weight: 400;
  }
  td.right {
    text-align: right;
    font-family: 'JetBrains Mono', monospace;
    color: #444;
    font-weight: 500;
    font-size: 11px;
  }
  tr:nth-child(even) { background: #fafbf8; }

  /* ── Totals ── */
  .totals-wrapper { display: flex; justify-content: flex-end; margin-bottom: 24px; }
  .totals { width: 260px; }
  .totals-row {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 12px;
    color: #666;
    font-weight: 400;
  }
  .totals-row .amount {
    font-family: 'JetBrains Mono', monospace;
    color: #333;
    font-weight: 500;
    font-size: 11px;
  }
  .totals-row.grand {
    border-top: 2px solid #181a0e;
    padding-top: 10px;
    margin-top: 6px;
    font-size: 16px;
    font-weight: 600;
    color: #181a0e;
  }
  .totals-row.grand .amount {
    color: #3d6b0e;
    font-weight: 700;
    font-size: 15px;
  }

  /* ── Notes ── */
  .notes {
    background: #f5f7f0;
    padding: 12px 16px;
    border-radius: 4px;
    margin-bottom: 20px;
    border-left: 3px solid #a7d26d;
  }
  .notes-label {
    font-size: 10px;
    letter-spacing: 0.3px;
    color: #999;
    margin-bottom: 6px;
    font-weight: 500;
  }
  .notes-text { font-size: 11px; color: #555; line-height: 1.6; }

  /* ── Verification ── */
  .verification {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 16px 0;
    border-top: 1px solid #eee;
    margin-top: 12px;
  }
  .qr-section { text-align: center; }
  .qr-label {
    font-size: 10px;
    letter-spacing: 0.5px;
    color: #bbb;
    margin-bottom: 8px;
    font-weight: 500;
  }
  .signature-section { text-align: center; }
  .signature-label {
    font-size: 11px;
    color: #bbb;
    margin-top: 8px;
    letter-spacing: 0.3px;
    font-weight: 400;
  }

  /* ── Footer ── */
  .footer {
    background: #a7d26d;
    padding: 16px 40px;
    flex-shrink: 0;
  }

  /* Multi-page: keep table rows together */
  tr { page-break-inside: avoid; }
  .party { page-break-inside: avoid; }
  .totals-wrapper { page-break-inside: avoid; }
  .verification { page-break-inside: avoid; }

  .footer-line1 {
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(24,26,14,0.12);
  }
  .footer-address {
    font-size: 13px;
    color: rgba(24,26,14,0.8);
    font-weight: 500;
  }
  .footer-line2 {
    display: flex;
    justify-content: center;
    gap: 32px;
    align-items: center;
    font-size: 11px;
  }
  .footer-line2 > div {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .footer-item-label {
    font-size: 12px;
    color: rgba(24,26,14,0.45);
    font-weight: 600;
  }
  .footer-item-value {
    font-size: 12px;
    color: #181a0e;
    font-weight: 500;
  }
  .footer-sep {
    width: 1px;
    height: 12px;
    background: rgba(24,26,14,0.15);
  }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { width: 100%; min-height: auto; }
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
  </div>

  <!-- CONTENT (white) -->
  <div class="content">
    <div class="parties">
      <div class="party">
        <div class="party-label">Emetteur</div>
        <div class="party-name">${invoice.senderName || '—'}</div>
        <div class="party-detail">
          ${invoice.senderAddress || invoice.senderCity ? `<div>${[invoice.senderAddress, invoice.senderCity].filter(Boolean).join(', ').toLowerCase()}</div>` : ''}
          ${invoice.senderEmail ? `<div>${invoice.senderEmail.toLowerCase()}</div>` : ''}
          ${invoice.senderPhone ? `<div>${invoice.senderPhone}</div>` : ''}
          ${invoice.senderIce ? `<div style="font-family:'JetBrains Mono',monospace;font-size:9.5px;color:#888;margin-top:4px;">ice ${invoice.senderIce}</div>` : ''}
        </div>
      </div>
      <div class="party">
        <div class="party-label">Facturer a</div>
        <div class="party-name">${invoice.clientName || '—'}</div>
        <div class="party-detail">
          ${invoice.clientAddress || invoice.clientCity ? `<div>${[invoice.clientAddress, invoice.clientCity].filter(Boolean).join(', ').toLowerCase()}</div>` : ''}
          ${invoice.clientEmail ? `<div>${invoice.clientEmail.toLowerCase()}</div>` : ''}
          ${invoice.clientIce ? `<div style="font-family:'JetBrains Mono',monospace;font-size:9.5px;color:#888;margin-top:4px;">ice ${invoice.clientIce}</div>` : ''}
        </div>
      </div>
    </div>

    <table>
      <colgroup>
        <col style="width: 50%">
        <col style="width: 12%">
        <col style="width: 19%">
        <col style="width: 19%">
      </colgroup>
      <thead>
        <tr>
          <th>Description</th>
          <th class="right">Quantite</th>
          <th class="right">Prix unit.</th>
          <th class="right">Montant</th>
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
        ${stampBase64 ? `<img src="${stampBase64}" style="max-height:150px;max-width:200px;margin-top:8px;" />` : ''}
      </div>
    </div>
  </div>

  <!-- FOOTER (dark) -->
  <div class="footer">
    <div class="footer-line1">
      <div class="footer-address">${[invoice.senderAddress, invoice.senderCity].filter(Boolean).join(', ').toLowerCase()}</div>
    </div>
    <div class="footer-line2">
      <div>
        <span class="footer-item-label">ICE</span>
        <span class="footer-item-value">${invoice.senderIce || '—'}</span>
      </div>
      <div class="footer-sep"></div>
      <div>
        <span class="footer-item-label">TEL</span>
        <span class="footer-item-value">${invoice.senderPhone || '—'}</span>
      </div>
      <div class="footer-sep"></div>
      <div>
        <span class="footer-item-label">EMAIL</span>
        <span class="footer-item-value">${(invoice.senderEmail || '—').toLowerCase()}</span>
      </div>
    </div>
  </div>
</div>

</body>
</html>`

  // Render to PDF using Playwright
  try {
    const { chromium } = await import('playwright')
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle' })
    // Wait for Google Fonts to load
    await page.waitForTimeout(1500)
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    })
    await browser.close()

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="facture-${invoice.invoiceNumber}.pdf"`,
      },
    })
  } catch (err) {
    // Fallback to HTML if Playwright fails
    console.error('PDF generation failed, falling back to HTML:', err)
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  }
}
