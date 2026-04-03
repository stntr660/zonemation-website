import type { AdminViewServerProps } from 'payload'
import { sql } from 'drizzle-orm'

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

interface AccountBalance {
  id: number
  name: string
  currency: string
  tracksTVA: boolean
  balance: number
}

export default async function FinanceDashboard({ req }: AdminViewServerProps) {
  const { payload } = req
  const db = (payload.db as any).drizzle

  // Run all queries in parallel using raw SQL for speed
  const [accountsResult, balancesResult, recentResult, usdToMad] = await Promise.all([
    payload.find({ collection: 'accounts', limit: 100, sort: 'name', depth: 0 }),
    db.execute(sql`
      SELECT
        COALESCE(account_id, from_account_id, to_account_id) as acc_id,
        SUM(CASE
          WHEN type = 'income' THEN amount
          WHEN type = 'expense' THEN -amount
          WHEN type = 'transfer' AND account_id IS NULL AND from_account_id IS NOT NULL THEN -from_amount
          ELSE 0
        END) as balance
      FROM transactions
      WHERE account_id IS NOT NULL OR from_account_id IS NOT NULL
      GROUP BY acc_id
      UNION ALL
      SELECT to_account_id as acc_id, SUM(to_amount) as balance
      FROM transactions
      WHERE type = 'transfer' AND to_account_id IS NOT NULL
      GROUP BY to_account_id
    `),
    payload.find({
      collection: 'transactions',
      limit: 8,
      sort: '-date',
      depth: 1,
    }),
    getExchangeRate(),
  ])

  const accounts = accountsResult.docs

  // Aggregate balances per account
  const balanceMap = new Map<number, number>()
  accounts.forEach((a: any) => balanceMap.set(a.id, 0))
  for (const row of balancesResult.rows ?? balancesResult) {
    const accId = row.acc_id
    if (accId != null) {
      balanceMap.set(accId, (balanceMap.get(accId) ?? 0) + parseFloat(row.balance ?? 0))
    }
  }

  const accountBalances: AccountBalance[] = accounts.map((a: any) => ({
    id: a.id,
    name: a.name,
    currency: a.currency,
    tracksTVA: a.tracksTVA ?? false,
    balance: balanceMap.get(a.id) ?? 0,
  }))

  let totalMAD = 0
  accountBalances.forEach((a) => {
    if (a.currency === 'MAD') {
      totalMAD += a.balance
    } else {
      totalMAD += a.balance * usdToMad
    }
  })

  const recent = recentResult.docs

  const formatAmount = (amount: number, currency: string) => {
    const formatted = Math.abs(amount).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    const symbol = currency === 'MAD' ? 'DH' : currency === 'USDT' ? 'USDT' : '$'
    return currency === 'MAD' ? `${formatted} ${symbol}` : `${symbol}${formatted}`
  }

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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        {accountBalances.map((a) => (
          <div
            key={a.id}
            style={{
              background: 'var(--theme-elevation-100)',
              borderRadius: '8px',
              padding: '16px',
              border: '1px solid var(--theme-elevation-200)',
            }}
          >
            <div style={{ fontSize: '13px', color: 'var(--theme-elevation-500)', marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{a.name}</span>
              {a.tracksTVA && (
                <span style={{ fontSize: '10px', background: 'var(--theme-elevation-200)', padding: '2px 6px', borderRadius: '4px' }}>
                  TVA
                </span>
              )}
            </div>
            <div style={{ fontSize: '22px', fontWeight: 600 }}>
              {formatAmount(a.balance, a.currency)}
            </div>
          </div>
        ))}
      </div>

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
                : formatAmount(t.amount ?? 0, typeof t.account === 'object' ? t.account?.currency ?? 'MAD' : 'MAD')

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
