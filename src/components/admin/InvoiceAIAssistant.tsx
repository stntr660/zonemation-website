'use client'

import { useState } from 'react'
import { useFormFields, useForm } from '@payloadcms/ui'

const TONES = [
  { value: 'premium', label: 'Premium' },
  { value: 'professionnel', label: 'Professionnel' },
  { value: 'technique', label: 'Technique' },
  { value: 'creatif', label: 'Creatif' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'minimaliste', label: 'Minimaliste' },
]

const LANGUAGES = [
  { value: 'fr', label: 'FR' },
  { value: 'en', label: 'EN' },
  { value: 'ar', label: 'AR' },
]

export default function InvoiceAIAssistant() {
  const [description, setDescription] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [tone, setTone] = useState('premium')
  const [language, setLanguage] = useState('fr')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { dispatchFields } = useForm()

  const handleGenerate = async () => {
    if (!description.trim() || !totalAmount) {
      setError('Decrivez le travail et indiquez le montant total')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/generate-invoice-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          language,
          tone,
          totalAmount: parseFloat(totalAmount),
          clientName: '',
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || 'Erreur lors de la generation')
        return
      }

      if (data.items && Array.isArray(data.items)) {
        dispatchFields({
          type: 'UPDATE',
          path: 'items',
          value: data.items.map((item: any, i: number) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        })

        if (data.notes) {
          dispatchFields({
            type: 'UPDATE',
            path: 'notes',
            value: data.notes,
          })
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erreur reseau')
    } finally {
      setLoading(false)
    }
  }

  const baseStyle: React.CSSProperties = {
    background: 'var(--theme-elevation-100)',
    border: '1px solid var(--theme-elevation-200)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    background: 'var(--theme-elevation-0)',
    border: '1px solid var(--theme-elevation-300)',
    borderRadius: '4px',
    color: 'var(--theme-text)',
    fontSize: '14px',
    fontFamily: 'inherit',
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    width: 'auto',
    cursor: 'pointer',
  }

  const btnStyle: React.CSSProperties = {
    padding: '8px 20px',
    background: loading ? 'var(--theme-elevation-300)' : '#A7D26D',
    color: '#0C130B',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: loading ? 'not-allowed' : 'pointer',
  }

  return (
    <div style={baseStyle}>
      <div
        style={{
          fontSize: '13px',
          color: 'var(--theme-elevation-500)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '12px',
        }}
      >
        AI Assistant
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Decrivez le travail effectue (ex: montage video horizontal et vertical, animations motion design, sessions nocturnes...)"
        rows={3}
        style={{ ...inputStyle, resize: 'vertical', marginBottom: '12px' }}
      />

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          placeholder="Montant total"
          style={{ ...inputStyle, width: '140px' }}
        />

        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={selectStyle}>
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>

        <select value={tone} onChange={(e) => setTone(e.target.value)} style={selectStyle}>
          {TONES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleGenerate} disabled={loading} style={btnStyle}>
          {loading ? 'Generation...' : 'Generer'}
        </button>
      </div>

      {error && (
        <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>{error}</div>
      )}
    </div>
  )
}
