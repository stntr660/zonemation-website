import { getPayload } from 'payload'
import config from '@/payload.config'
import { getAccountSummaries } from '@/lib/financeSummary'
import { formatMoney } from '@/lib/money'
import AccountBreakdown from './AccountBreakdown'

const FALLBACK_RATE = 10

let cachedRate: { value: number; timestamp: number } | null = null

async function getExchangeRate(): Promise<number> {
  if (cachedRate && Date.now() - cachedRate.timestamp < 6 * 3600 * 1000) {
    return cachedRate.value
  }
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 21600 },
    })
    if (!res.ok) return cachedRate?.value ?? FALLBACK_RATE
    const data = await res.json()
    const rate = data?.rates?.MAD ?? FALLBACK_RATE
    cachedRate = { value: rate, timestamp: Date.now() }
    return rate
  } catch {
    return cachedRate?.value ?? FALLBACK_RATE
  }
}

export default async function FinanceDashboard() {
  const payload = await getPayload({ config })

  // All-time summaries for first paint; AccountBreakdown refetches period-scoped
  // figures on demand. Solde stays all-time (current balance) in every mode.
  const [summaries, recentResult, usdToMad] = await Promise.all([
    getAccountSummaries(payload, null),
    payload.find({ collection: 'transactions', limit: 8, sort: '-date', depth: 1 }),
    getExchangeRate(),
  ])

  let totalMAD = 0
  summaries.forEach((a) => {
    totalMAD += a.currency === 'MAD' ? a.balance : a.balance * usdToMad
  })

  const recent = recentResult.docs

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
    })
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          background: 'var(--theme-elevation-100)',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '16px',
          border: '1px solid var(--theme-elevation-200)',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--theme-elevation-500)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Total Estimate
        </div>
        <div style={{ fontSize: '36px', fontWeight: 700, lineHeight: 1.2 }}>
          {totalMAD.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
        </div>
        <div style={{ fontSize: '12px', color: 'var(--theme-elevation-500)', marginTop: '4px' }}>
          1 USD = {usdToMad.toFixed(2)} MAD
        </div>
      </div>

      <AccountBreakdown initialAccounts={summaries} />

      <div
        style={{
          background: 'var(--theme-elevation-100)',
          borderRadius: '8px',
          border: '1px solid var(--theme-elevation-200)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px 16px 8px', fontSize: '13px', color: 'var(--theme-elevation-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Recent Transactions
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {recent.map((t: any) => {
              const isIncome = t.type === 'income'
              const isTransfer = t.type === 'transfer'
              const accName = isTransfer
                ? `${typeof t.fromAccount === 'object' ? t.fromAccount?.name : '?'} -> ${typeof t.toAccount === 'object' ? t.toAccount?.name : '?'}`
                : typeof t.account === 'object' ? t.account?.name : ''

              const displayAmount = isTransfer
                ? `${t.fromAmount ?? 0} -> ${t.toAmount ?? 0}`
                : formatMoney(t.amount ?? 0, typeof t.account === 'object' ? t.account?.currency ?? 'MAD' : 'MAD')

              return (
                <tr key={t.id} style={{ borderTop: '1px solid var(--theme-elevation-200)' }}>
                  <td style={{ padding: '10px 16px', fontSize: '13px', color: 'var(--theme-elevation-500)', width: '60px' }}>
                    {formatDate(t.date)}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '14px' }}>
                    {t.description}
                  </td>
                  <td style={{ padding: '10px 8px', fontSize: '12px', color: 'var(--theme-elevation-500)' }}>
                    {accName}
                  </td>
                  <td
                    style={{
                      padding: '10px 16px',
                      fontSize: '14px',
                      fontWeight: 600,
                      textAlign: 'right',
                      color: isTransfer ? 'var(--theme-elevation-500)' : isIncome ? '#22c55e' : '#ef4444',
                    }}
                  >
                    {isTransfer ? '' : isIncome ? '+' : '-'}{displayAmount}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
