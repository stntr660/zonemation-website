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

// Drill-down: the account's transactions in the admin list view.
function accountTransactionsHref(accountId: number): string {
  return `/admin/collections/transactions?where[account][equals]=${accountId}`
}

export default function AccountBreakdown({ initialAccounts }: Props) {
  const [period, setPeriod] = useState<FinancePeriod>('all')
  const [accounts, setAccounts] = useState<AccountSummary[]>(initialAccounts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

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
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
        {PERIODS.map((p) => {
          const active = p.value === period
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => selectPeriod(p.value)}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                borderRadius: '8px',
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
          <span style={{ fontSize: '13px', color: 'var(--theme-elevation-500)' }}>Loading...</span>
        )}
        {error && <span style={{ fontSize: '13px', color: '#ef4444' }}>{error}</span>}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
          opacity: loading ? 0.6 : 1,
          transition: 'opacity 0.15s ease',
        }}
      >
        {accounts.map((a) => {
          const net = a.income - a.expense + a.transferNet
          const hovered = hoveredId === a.id
          return (
            <a
              key={a.id}
              href={accountTransactionsHref(a.id)}
              title={`View ${a.name} transactions`}
              onMouseEnter={() => setHoveredId(a.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                background: 'var(--theme-elevation-100)',
                borderRadius: '12px',
                padding: '24px',
                border: `1px solid ${hovered ? 'var(--theme-elevation-400)' : 'var(--theme-elevation-200)'}`,
                boxShadow: hovered ? '0 4px 14px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.06)',
                transform: hovered ? 'translateY(-2px)' : 'none',
                transition: 'transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--theme-text)', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{a.name}</span>
                {a.tracksTVA && (
                  <span style={{ fontSize: '11px', fontWeight: 500, background: 'var(--theme-elevation-200)', color: 'var(--theme-elevation-600)', padding: '3px 8px', borderRadius: '5px' }}>
                    TVA
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', marginBottom: '9px' }}>
                <span style={{ color: 'var(--theme-elevation-500)' }}>Incomes</span>
                <span style={{ color: '#22c55e', fontWeight: 600 }}>+{formatMoney(a.income, a.currency)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                <span style={{ color: 'var(--theme-elevation-500)' }}>Expenses</span>
                <span style={{ color: '#ef4444', fontWeight: 600 }}>-{formatMoney(a.expense, a.currency)}</span>
              </div>

              {a.transferNet !== 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', marginTop: '9px' }}>
                  <span style={{ color: 'var(--theme-elevation-500)' }}>Transfers</span>
                  <span style={{ fontWeight: 600 }}>
                    {a.transferNet > 0 ? '+' : '-'}
                    {formatMoney(a.transferNet, a.currency)}
                  </span>
                </div>
              )}

              {showNet && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', marginTop: '9px' }}>
                  <span style={{ color: 'var(--theme-elevation-500)' }}>
                    Net ({period === 'month' ? 'month' : 'year'})
                  </span>
                  <span style={{ fontWeight: 700 }}>
                    {net >= 0 ? '+' : '-'}
                    {formatMoney(net, a.currency)}
                  </span>
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--theme-elevation-200)', margin: '18px 0 14px' }} />

              <div style={{ fontSize: '11px', color: 'var(--theme-elevation-500)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                Solde{showNet ? ' (now)' : ''}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.1, color: a.balance < 0 ? '#ef4444' : 'var(--theme-text)' }}>
                {a.balance < 0 ? '-' : ''}
                {formatMoney(a.balance, a.currency)}
              </div>

              <div style={{ marginTop: '14px', fontSize: '12px', fontWeight: 500, color: hovered ? 'var(--theme-text)' : 'var(--theme-elevation-450)' }}>
                View transactions &rarr;
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
