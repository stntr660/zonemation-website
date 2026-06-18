'use client'

import { useState } from 'react'
import { formatMoney } from '@/lib/money'
import type { AccountSummary, FinancePeriod } from '@/lib/financeSummary'

const PERIODS: { value: FinancePeriod; label: string }[] = [
  { value: 'month', label: 'This month' },
  { value: 'year', label: 'This year' },
  { value: 'all', label: 'All time' },
]

interface Props {
  // All-time summaries rendered server-side on first paint (no fetch needed).
  initialAccounts: AccountSummary[]
}

export default function AccountBreakdown({ initialAccounts }: Props) {
  const [period, setPeriod] = useState<FinancePeriod>('all')
  const [accounts, setAccounts] = useState<AccountSummary[]>(initialAccounts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function selectPeriod(next: FinancePeriod) {
    if (next === period || loading) return
    setPeriod(next)
    setError(null)
    if (next === 'all') {
      setAccounts(initialAccounts)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/finance-summary?period=${next}`, { credentials: 'include' })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const data = await res.json()
      setAccounts(data.accounts as AccountSummary[])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
      setAccounts([])
    } finally {
      setLoading(false)
    }
  }

  const showNet = period !== 'all'

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', alignItems: 'center' }}>
        {PERIODS.map((p) => {
          const active = p.value === period
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => selectPeriod(p.value)}
              style={{
                padding: '6px 12px',
                fontSize: '13px',
                borderRadius: '6px',
                cursor: loading ? 'default' : 'pointer',
                border: '1px solid var(--theme-elevation-200)',
                background: active ? 'var(--theme-elevation-200)' : 'transparent',
                color: active ? 'var(--theme-text)' : 'var(--theme-elevation-500)',
                fontWeight: active ? 600 : 400,
              }}
            >
              {p.label}
            </button>
          )
        })}
        {loading && (
          <span style={{ fontSize: '12px', color: 'var(--theme-elevation-500)' }}>Loading...</span>
        )}
        {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
          opacity: loading ? 0.6 : 1,
          transition: 'opacity 0.15s ease',
        }}
      >
        {accounts.map((a) => {
          const net = a.income - a.expense + a.transferNet
          return (
            <div
              key={a.id}
              style={{
                background: 'var(--theme-elevation-100)',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid var(--theme-elevation-200)',
              }}
            >
              <div style={{ fontSize: '13px', color: 'var(--theme-elevation-500)', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{a.name}</span>
                {a.tracksTVA && (
                  <span style={{ fontSize: '10px', background: 'var(--theme-elevation-200)', padding: '2px 6px', borderRadius: '4px' }}>
                    TVA
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--theme-elevation-500)' }}>Incomes</span>
                <span style={{ color: '#22c55e', fontWeight: 500 }}>+{formatMoney(a.income, a.currency)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--theme-elevation-500)' }}>Expenses</span>
                <span style={{ color: '#ef4444', fontWeight: 500 }}>-{formatMoney(a.expense, a.currency)}</span>
              </div>

              {a.transferNet !== 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '6px' }}>
                  <span style={{ color: 'var(--theme-elevation-500)' }}>Transfers</span>
                  <span style={{ fontWeight: 500 }}>
                    {a.transferNet > 0 ? '+' : '-'}
                    {formatMoney(a.transferNet, a.currency)}
                  </span>
                </div>
              )}

              {showNet && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '6px' }}>
                  <span style={{ color: 'var(--theme-elevation-500)' }}>
                    Net ({period === 'month' ? 'month' : 'year'})
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    {net >= 0 ? '+' : '-'}
                    {formatMoney(net, a.currency)}
                  </span>
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--theme-elevation-200)', margin: '12px 0 10px' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '13px', color: 'var(--theme-elevation-500)' }}>
                  Solde{showNet ? ' (now)' : ''}
                </span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: a.balance < 0 ? '#ef4444' : 'inherit' }}>
                  {a.balance < 0 ? '-' : ''}
                  {formatMoney(a.balance, a.currency)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
