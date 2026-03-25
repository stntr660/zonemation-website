'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'

interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

interface InvoiceData {
  dbId: string | null
  invoiceNumber: string
  issueDate: string
  dueDate: string
  currency: string
  senderName: string
  senderAddress: string
  senderCity: string
  senderEmail: string
  senderPhone: string
  senderIce: string
  clientName: string
  clientAddress: string
  clientCity: string
  clientEmail: string
  clientIce: string
  items: LineItem[]
  taxRate: number
  notes: string
  signatureData: string
}

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

const today = new Date().toISOString().split('T')[0]
const in30Days = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]

const defaultData: InvoiceData = {
  dbId: null,
  invoiceNumber: '',
  issueDate: today,
  dueDate: in30Days,
  currency: 'MAD',
  senderName: '',
  senderAddress: '',
  senderCity: '',
  senderEmail: '',
  senderPhone: '',
  senderIce: '',
  clientName: '',
  clientAddress: '',
  clientCity: '',
  clientEmail: '',
  clientIce: '',
  items: [{ id: generateId(), description: '', quantity: 1, unitPrice: 0 }],
  taxRate: 20,
  notes: '',
  signatureData: '',
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  className = '',
  readOnly = false,
}: {
  label: string
  value: string | number
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  className?: string
  readOnly?: boolean
}) {
  return (
    <div className={className}>
      <label className="block text-sm uppercase tracking-wider text-white/30 mb-1.5 font-mono">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full bg-white/[0.03] border border-white/10 text-white/80 text-base px-3 py-2.5 rounded focus:outline-none focus:border-[#a7d26d]/40 transition-colors placeholder:text-white/15 ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm uppercase tracking-[0.15em] text-[#a7d26d]/70 font-mono mb-4 flex items-center gap-3">
      <span className="h-px flex-1 bg-[#a7d26d]/10" />
      {children}
      <span className="h-px flex-1 bg-[#a7d26d]/10" />
    </h3>
  )
}

// Simple signature pad
function SignaturePad({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (data: string) => void
  label: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDrawing = useRef(false)

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.strokeStyle = '#a7d26d'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const endDraw = () => {
    isDrawing.current = false
    const canvas = canvasRef.current
    if (!canvas) return
    onChange(canvas.toDataURL('image/png'))
  }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    onChange('')
  }

  useEffect(() => {
    if (value && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0)
      img.src = value
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm uppercase tracking-wider text-white/30 font-mono">
          {label}
        </label>
        <button
          type="button"
          onClick={clear}
          className="text-sm text-white/20 hover:text-red-400/60 transition-colors font-mono"
        >
          Effacer
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={100}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
        className="w-full h-[100px] bg-white/[0.03] border border-white/10 rounded cursor-crosshair touch-none"
      />
    </div>
  )
}

interface SavedInvoice {
  id: string
  invoiceNumber: string
  clientName: string
  total: number
  status: string
}

export default function InvoicePage() {
  const t = useTranslations('invoice')
  const [data, setData] = useState<InvoiceData>(defaultData)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [savedInvoices, setSavedInvoices] = useState<SavedInvoice[]>([])
  const [loadingList, setLoadingList] = useState(true)

  // Load saved invoices list
  useEffect(() => {
    fetch('/api/invoices?limit=50&sort=-createdAt')
      .then((r) => r.json())
      .then((res) => {
        setSavedInvoices(
          (res.docs || []).map((d: Record<string, unknown>) => ({
            id: d.id,
            invoiceNumber: d.invoiceNumber,
            clientName: d.clientName || '—',
            total: d.total || 0,
            status: d.status || 'draft',
          })),
        )
      })
      .catch(() => {})
      .finally(() => setLoadingList(false))
  }, [saved])

  const update = useCallback(
    <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }))
      setSaved(false)
    },
    [],
  )

  const updateItem = useCallback((id: string, field: keyof LineItem, value: string | number) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
    setSaved(false)
  }, [])

  const addItem = useCallback(() => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: generateId(), description: '', quantity: 1, unitPrice: 0 }],
    }))
  }, [])

  const removeItem = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.length > 1 ? prev.items.filter((item) => item.id !== id) : prev.items,
    }))
  }, [])

  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const taxAmount = subtotal * (data.taxRate / 100)
  const total = subtotal + taxAmount

  const handleSave = async () => {
    setSaving(true)
    try {
      const payload = {
        issueDate: data.issueDate,
        dueDate: data.dueDate,
        currency: data.currency,
        senderName: data.senderName,
        senderAddress: data.senderAddress,
        senderCity: data.senderCity,
        senderEmail: data.senderEmail,
        senderPhone: data.senderPhone,
        senderIce: data.senderIce,
        clientName: data.clientName,
        clientAddress: data.clientAddress,
        clientCity: data.clientCity,
        clientEmail: data.clientEmail,
        clientIce: data.clientIce,
        items: data.items.map(({ description, quantity, unitPrice }) => ({
          description,
          quantity,
          unitPrice,
        })),
        taxRate: data.taxRate,
        notes: data.notes,
        signatureData: data.signatureData,
      }

      let res
      if (data.dbId) {
        res = await fetch(`/api/invoices/${data.dbId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch('/api/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      }

      if (res.ok) {
        const result = await res.json()
        const doc = result.doc || result
        setData((prev) => ({
          ...prev,
          dbId: doc.id,
          invoiceNumber: doc.invoiceNumber || prev.invoiceNumber,
        }))
        setSaved(true)
      }
    } catch {
      // Handle error silently
    }
    setSaving(false)
  }

  const handleLoad = async (id: string) => {
    try {
      const res = await fetch(`/api/invoices/${id}`)
      if (!res.ok) return
      const doc = await res.json()
      setData({
        dbId: doc.id,
        invoiceNumber: doc.invoiceNumber || '',
        issueDate: doc.issueDate?.split('T')[0] || today,
        dueDate: doc.dueDate?.split('T')[0] || in30Days,
        currency: doc.currency || 'MAD',
        senderName: doc.senderName || '',
        senderAddress: doc.senderAddress || '',
        senderCity: doc.senderCity || '',
        senderEmail: doc.senderEmail || '',
        senderPhone: doc.senderPhone || '',
        senderIce: doc.senderIce || '',
        clientName: doc.clientName || '',
        clientAddress: doc.clientAddress || '',
        clientCity: doc.clientCity || '',
        clientEmail: doc.clientEmail || '',
        clientIce: doc.clientIce || '',
        items: (doc.items || []).map((item: Record<string, unknown>) => ({
          id: generateId(),
          description: item.description || '',
          quantity: item.quantity || 1,
          unitPrice: item.unitPrice || 0,
        })),
        taxRate: doc.taxRate ?? 20,
        notes: doc.notes || '',
        signatureData: doc.signatureData || '',
      })
      setSaved(true)
    } catch {
      // Handle error
    }
  }

  const handleDownloadPdf = () => {
    if (!data.dbId) return
    window.open(`/fr/invoice/pdf/${data.dbId}`, '_blank')
  }

  const handleNewInvoice = () => {
    setData({ ...defaultData, items: [{ id: generateId(), description: '', quantity: 1, unitPrice: 0 }] })
    setSaved(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-[#a7d26d]/60 font-mono mb-2">
          {t('toolLabel')}
        </p>
        <h1 className="text-3xl md:text-4xl font-extralight text-white/90 tracking-wide">
          {t('title')}
        </h1>
        <p className="text-white/30 text-base mt-2 max-w-xl">
          {t('subtitle')}
        </p>
      </div>

      {/* Saved invoices bar */}
      <div className="mb-8 border border-white/[0.06] rounded-lg p-4 bg-white/[0.01]">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={handleNewInvoice}
            className="text-base text-[#a7d26d] hover:text-white border border-[#a7d26d]/30 hover:border-white/30 px-4 py-2 rounded transition-all duration-300 font-mono"
          >
            + {t('newInvoice')}
          </button>
          <div className="h-6 w-px bg-white/10" />
          <span className="text-sm uppercase tracking-wider text-white/25 font-mono">
            {t('savedInvoices')}
          </span>
          {loadingList ? (
            <span className="text-white/20 text-base">...</span>
          ) : savedInvoices.length === 0 ? (
            <span className="text-white/20 text-base">{t('noInvoices')}</span>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {savedInvoices.map((inv) => (
                <button
                  key={inv.id}
                  onClick={() => handleLoad(inv.id)}
                  className={`text-sm px-3 py-1.5 rounded border transition-all duration-200 font-mono ${
                    data.dbId === inv.id
                      ? 'border-[#a7d26d]/40 text-[#a7d26d] bg-[#a7d26d]/5'
                      : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
                  }`}
                >
                  {inv.invoiceNumber}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT: Form */}
        <div className="space-y-8">
          {/* Invoice Meta */}
          <div className="border border-white/[0.06] rounded-lg p-6 bg-white/[0.01]">
            <SectionLabel>{t('invoiceDetails')}</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={t('invoiceNumber')}
                value={data.invoiceNumber || t('autoGenerated')}
                onChange={() => {}}
                readOnly
              />
              <div>
                <label className="block text-sm uppercase tracking-wider text-white/30 mb-1.5 font-mono">
                  {t('currency')}
                </label>
                <select
                  value={data.currency}
                  onChange={(e) => update('currency', e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 text-white/80 text-base px-3 py-2.5 rounded focus:outline-none focus:border-[#a7d26d]/40 transition-colors"
                >
                  <option value="MAD">MAD</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              <InputField
                label={t('issueDate')}
                value={data.issueDate}
                onChange={(v) => update('issueDate', v)}
                type="date"
              />
              <InputField
                label={t('dueDate')}
                value={data.dueDate}
                onChange={(v) => update('dueDate', v)}
                type="date"
              />
            </div>
          </div>

          {/* Sender */}
          <div className="border border-white/[0.06] rounded-lg p-6 bg-white/[0.01]">
            <SectionLabel>{t('from')}</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={t('companyName')}
                value={data.senderName}
                onChange={(v) => update('senderName', v)}
                className="col-span-2"
              />
              <InputField
                label={t('address')}
                value={data.senderAddress}
                onChange={(v) => update('senderAddress', v)}
              />
              <InputField
                label={t('city')}
                value={data.senderCity}
                onChange={(v) => update('senderCity', v)}
              />
              <InputField
                label={t('email')}
                value={data.senderEmail}
                onChange={(v) => update('senderEmail', v)}
                type="email"
              />
              <InputField
                label={t('phone')}
                value={data.senderPhone}
                onChange={(v) => update('senderPhone', v)}
                type="tel"
              />
              <InputField
                label="ICE"
                value={data.senderIce}
                onChange={(v) => update('senderIce', v)}
                className="col-span-2"
              />
            </div>
          </div>

          {/* Client */}
          <div className="border border-white/[0.06] rounded-lg p-6 bg-white/[0.01]">
            <SectionLabel>{t('billTo')}</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label={t('clientName')}
                value={data.clientName}
                onChange={(v) => update('clientName', v)}
                className="col-span-2"
              />
              <InputField
                label={t('address')}
                value={data.clientAddress}
                onChange={(v) => update('clientAddress', v)}
              />
              <InputField
                label={t('city')}
                value={data.clientCity}
                onChange={(v) => update('clientCity', v)}
              />
              <InputField
                label={t('email')}
                value={data.clientEmail}
                onChange={(v) => update('clientEmail', v)}
                type="email"
              />
              <InputField
                label="ICE"
                value={data.clientIce}
                onChange={(v) => update('clientIce', v)}
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="border border-white/[0.06] rounded-lg p-6 bg-white/[0.01]">
            <SectionLabel>{t('lineItems')}</SectionLabel>
            <div className="space-y-3">
              {data.items.map((item, idx) => (
                <div key={item.id} className="grid grid-cols-12 gap-3 items-end">
                  <div className="col-span-5">
                    {idx === 0 && (
                      <label className="block text-sm uppercase tracking-wider text-white/30 mb-1.5 font-mono">
                        {t('description')}
                      </label>
                    )}
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder={t('itemPlaceholder')}
                      className="w-full bg-white/[0.03] border border-white/10 text-white/80 text-base px-3 py-2.5 rounded focus:outline-none focus:border-[#a7d26d]/40 transition-colors placeholder:text-white/15"
                    />
                  </div>
                  <div className="col-span-2">
                    {idx === 0 && (
                      <label className="block text-sm uppercase tracking-wider text-white/30 mb-1.5 font-mono">
                        {t('qty')}
                      </label>
                    )}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value) || 0)}
                      className="w-full bg-white/[0.03] border border-white/10 text-white/80 text-base px-3 py-2.5 rounded focus:outline-none focus:border-[#a7d26d]/40 transition-colors text-center"
                    />
                  </div>
                  <div className="col-span-3">
                    {idx === 0 && (
                      <label className="block text-sm uppercase tracking-wider text-white/30 mb-1.5 font-mono">
                        {t('unitPrice')}
                      </label>
                    )}
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice || ''}
                      onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full bg-white/[0.03] border border-white/10 text-white/80 text-base px-3 py-2.5 rounded focus:outline-none focus:border-[#a7d26d]/40 transition-colors text-right placeholder:text-white/15"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-white/40 text-base font-mono flex-1 text-right">
                      {formatCurrency(item.quantity * item.unitPrice, data.currency)}
                    </span>
                    {data.items.length > 1 && (
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-white/20 hover:text-red-400/60 transition-colors text-lg leading-none"
                        aria-label="Remove item"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="mt-4 text-base text-[#a7d26d]/60 hover:text-[#a7d26d] transition-colors font-mono tracking-wide"
            >
              + {t('addLine')}
            </button>
          </div>

          {/* Tax, Notes & Signature */}
          <div className="border border-white/[0.06] rounded-lg p-6 bg-white/[0.01]">
            <SectionLabel>{t('additional')}</SectionLabel>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label={t('taxRate')}
                  value={data.taxRate}
                  onChange={(v) => update('taxRate', Number(v) || 0)}
                  type="number"
                />
              </div>
              <div>
                <label className="block text-sm uppercase tracking-wider text-white/30 mb-1.5 font-mono">
                  {t('notes')}
                </label>
                <textarea
                  value={data.notes}
                  onChange={(e) => update('notes', e.target.value)}
                  placeholder={t('notesPlaceholder')}
                  rows={3}
                  className="w-full bg-white/[0.03] border border-white/10 text-white/80 text-base px-3 py-2.5 rounded focus:outline-none focus:border-[#a7d26d]/40 transition-colors placeholder:text-white/15 resize-none"
                />
              </div>
              <SignaturePad
                value={data.signatureData}
                onChange={(v) => update('signatureData', v)}
                label={t('signature')}
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="border border-white/[0.06] rounded-lg overflow-hidden">
            {/* Preview Header */}
            <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between gap-3">
              <span className="text-sm uppercase tracking-[0.15em] text-white/30 font-mono">
                {t('preview')}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`text-base px-4 py-1.5 rounded transition-all duration-300 font-mono tracking-wide border ${
                    saved
                      ? 'border-[#a7d26d]/40 text-[#a7d26d]/60 bg-[#a7d26d]/5'
                      : 'border-[#a7d26d]/30 text-[#a7d26d] hover:text-white hover:border-white/30'
                  }`}
                >
                  {saving ? '...' : saved ? t('saved') : t('save')}
                </button>
                {data.dbId && (
                  <button
                    onClick={handleDownloadPdf}
                    className="text-base text-[#a7d26d] hover:text-white border border-[#a7d26d]/30 hover:border-white/30 px-4 py-1.5 rounded transition-all duration-300 font-mono tracking-wide"
                  >
                    {t('downloadPdf')}
                  </button>
                )}
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 bg-white/[0.02]">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8 pb-4 border-b border-[#a7d26d]/20">
                <div>
                  <h2 className="text-2xl font-extralight text-white/90 tracking-[0.15em]">
                    FACTURE
                  </h2>
                  <p className="text-sm font-mono text-white/30 mt-1">
                    {data.invoiceNumber || t('autoGenerated')}
                  </p>
                </div>
                <div className="text-right text-sm text-white/40 space-y-0.5">
                  <p>
                    <span className="text-white/25">{t('issueDate')}:</span>{' '}
                    <span className="text-white/60">{data.issueDate}</span>
                  </p>
                  <p>
                    <span className="text-white/25">{t('dueDate')}:</span>{' '}
                    <span className="text-white/60">{data.dueDate}</span>
                  </p>
                </div>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#a7d26d]/50 font-mono mb-2">
                    {t('from')}
                  </p>
                  <p className="text-base text-white/80 font-medium">
                    {data.senderName || '—'}
                  </p>
                  <div className="text-sm text-white/35 mt-1 space-y-0.5">
                    {data.senderAddress && <p>{data.senderAddress}</p>}
                    {data.senderCity && <p>{data.senderCity}</p>}
                    {data.senderEmail && <p>{data.senderEmail}</p>}
                    {data.senderPhone && <p>{data.senderPhone}</p>}
                    {data.senderIce && <p className="font-mono">ICE: {data.senderIce}</p>}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#a7d26d]/50 font-mono mb-2">
                    {t('billTo')}
                  </p>
                  <p className="text-base text-white/80 font-medium">
                    {data.clientName || '—'}
                  </p>
                  <div className="text-sm text-white/35 mt-1 space-y-0.5">
                    {data.clientAddress && <p>{data.clientAddress}</p>}
                    {data.clientCity && <p>{data.clientCity}</p>}
                    {data.clientEmail && <p>{data.clientEmail}</p>}
                    {data.clientIce && <p className="font-mono">ICE: {data.clientIce}</p>}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-6">
                <div className="grid grid-cols-12 gap-2 text-xs uppercase tracking-[0.1em] text-white/25 font-mono pb-2 border-b border-white/[0.06]">
                  <span className="col-span-5">{t('description')}</span>
                  <span className="col-span-2 text-center">{t('qty')}</span>
                  <span className="col-span-2 text-right">{t('unitPrice')}</span>
                  <span className="col-span-3 text-right">Total</span>
                </div>
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 gap-2 py-2.5 border-b border-white/[0.03] text-base"
                  >
                    <span className="col-span-5 text-white/60">
                      {item.description || <span className="text-white/15 italic">...</span>}
                    </span>
                    <span className="col-span-2 text-center text-white/40 font-mono">
                      {item.quantity}
                    </span>
                    <span className="col-span-2 text-right text-white/40 font-mono">
                      {formatCurrency(item.unitPrice, data.currency)}
                    </span>
                    <span className="col-span-3 text-right text-white/60 font-mono">
                      {formatCurrency(item.quantity * item.unitPrice, data.currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-56 space-y-1.5">
                  <div className="flex justify-between text-base text-white/40">
                    <span>Sous-total</span>
                    <span className="font-mono">{formatCurrency(subtotal, data.currency)}</span>
                  </div>
                  <div className="flex justify-between text-base text-white/40">
                    <span>TVA ({data.taxRate}%)</span>
                    <span className="font-mono">{formatCurrency(taxAmount, data.currency)}</span>
                  </div>
                  <div className="flex justify-between text-lg text-white/90 font-medium pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="font-mono text-[#a7d26d]">
                      {formatCurrency(total, data.currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Signature preview */}
              {data.signatureData && (
                <div className="mt-6 pt-4 border-t border-white/[0.04] flex justify-end">
                  <div className="text-center">
                    <img
                      src={data.signatureData}
                      alt="Signature"
                      className="h-[50px] opacity-80"
                    />
                    <p className="text-xs text-white/20 mt-1 uppercase tracking-wider font-mono">
                      {t('signature')}
                    </p>
                  </div>
                </div>
              )}

              {/* Notes */}
              {data.notes && (
                <div className="mt-4 pt-4 border-t border-white/[0.04]">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/20 font-mono mb-1">
                    {t('notes')}
                  </p>
                  <p className="text-sm text-white/30">{data.notes}</p>
                </div>
              )}

              {/* Footer preview */}
              {data.senderName && (
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
                  <p className="text-xs text-white/15 font-mono">
                    {data.senderName}
                    {data.senderIce && ` | ICE: ${data.senderIce}`}
                    {data.senderAddress && ` | ${data.senderAddress}`}
                    {data.senderCity && `, ${data.senderCity}`}
                  </p>
                  <p className="text-xs text-white/15 font-mono">
                    {data.senderPhone && data.senderPhone}
                    {data.senderEmail && ` | ${data.senderEmail}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
