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

interface AccountSummary {
  id: number
  name: string
  currency: string
  tracksTVA: boolean
  income: number
  expense: number
  transferNet: number
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
        acc_id,
        SUM(income) AS income,
        SUM(expense) AS expense,
        SUM(transfer_in) AS transfer_in,
        SUM(transfer_out) AS transfer_out
      FROM (
        SELECT account_id AS acc_id, COALESCE(amount, 0) AS income, 0 AS expense, 0 AS transfer_in, 0 AS transfer_out
        FROM transactions WHERE type = 'income' AND account_id IS NOT NULL
        UNION ALL
        SELECT account_id, 0, COALESCE(amount, 0), 0, 0
        FROM transactions WHERE type = 'expense' AND account_id IS NOT NULL
        UNION ALL
        SELECT from_account_id, 0, 0, 0, COALESCE(from_amount, 0)
        FROM transactions WHERE type = 'transfer' AND from_account_id IS NOT NULL
        UNION ALL
        SELECT to_account_id, 0, 0, COALESCE(to_amount, 0), 0
        FROM transactions WHERE type = 'transfer' AND to_account_id IS NOT NULL
      ) parts
      GROUP BY acc_id
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

  // Aggregate income, expense, and transfers per account (one row per account)
  const summaryMap = new Map<number, { income: number; expense: number; transferIn: number; transferOut: number }>()
  for (const row of balancesResult.rows ?? balancesResult) {
    const accId = row.acc_id
    if (accId != null) {
      summaryMap.set(accId, {
        income: parseFloat(row.income ?? 0),
        expense: parseFloat(row.expense ?? 0),
        transferIn: parseFloat(row.transfer_in ?? 0),
        transferOut: parseFloat(row.transfer_out ?? 0),
      })
    }
  }

  const accountBalances: AccountSummary[] = accounts.map((a: any) => {
    const s = summaryMap.get(a.id) ?? { income: 0, expense: 0, transferIn: 0, transferOut: 0 }
    const transferNet = s.transferIn - s.transferOut
    return {
      id: a.id,
      name: a.name,
      currency: a.currency,
      tracksTVA: a.tracksTVA ?? false,
      income: s.income,
      expense: s.expense,
      transferNet,
      balance: s.income - s.expense + transferNet,
    }
  })

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
    const symbol = currency === 'MAD' ? 'DH' : currency === 'USDT' ? 'USDT' : currency === 'EUR' ? '€' : '$'
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
              <span style={{ color: '#22c55e', fontWeight: 500 }}>+{formatAmount(a.income, a.currency)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--theme-elevation-500)' }}>Expenses</span>
              <span style={{ color: '#ef4444', fontWeight: 500 }}>-{formatAmount(a.expense, a.currency)}</span>
            </div>

            {a.transferNet !== 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '6px' }}>
                <span style={{ color: 'var(--theme-elevation-500)' }}>Transfers</span>
                <span style={{ fontWeight: 500 }}>
                  {a.transferNet > 0 ? '+' : '-'}{formatAmount(a.transferNet, a.currency)}
                </span>
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--theme-elevation-200)', margin: '12px 0 10px' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: '13px', color: 'var(--theme-elevation-500)' }}>Solde</span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: a.balance < 0 ? '#ef4444' : 'inherit' }}>
                {a.balance < 0 ? '-' : ''}{formatAmount(a.balance, a.currency)}
              </span>
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
