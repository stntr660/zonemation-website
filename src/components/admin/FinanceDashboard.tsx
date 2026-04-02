import type { AdminViewServerProps } from 'payload'

const FALLBACK_RATE = 10

async function getExchangeRate(): Promise<number> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return FALLBACK_RATE
    const data = await res.json()
    return data?.rates?.MAD ?? FALLBACK_RATE
  } catch {
    return FALLBACK_RATE
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

  const [accountsResult, transactionsResult, usdToMad] = await Promise.all([
    payload.find({ collection: 'accounts', limit: 100, sort: 'name' }),
    payload.find({ collection: 'transactions', limit: 10000 }),
    getExchangeRate(),
  ])

  const accounts = accountsResult.docs
  const transactions = transactionsResult.docs

  // Calculate balance per account
  const balanceMap = new Map<number, number>()
  accounts.forEach((a: any) => balanceMap.set(a.id, 0))

  transactions.forEach((t: any) => {
    if (t.type === 'transfer') {
      if (t.fromAccount?.id || t.fromAccount) {
        const fromId = typeof t.fromAccount === 'object' ? t.fromAccount.id : t.fromAccount
        balanceMap.set(fromId, (balanceMap.get(fromId) ?? 0) - (t.fromAmount ?? 0))
      }
      if (t.toAccount?.id || t.toAccount) {
        const toId = typeof t.toAccount === 'object' ? t.toAccount.id : t.toAccount
        balanceMap.set(toId, (balanceMap.get(toId) ?? 0) + (t.toAmount ?? 0))
      }
    } else if (t.type === 'income') {
      const accId = typeof t.account === 'object' ? t.account?.id : t.account
      if (accId) balanceMap.set(accId, (balanceMap.get(accId) ?? 0) + (t.amount ?? 0))
    } else if (t.type === 'expense') {
      const accId = typeof t.account === 'object' ? t.account?.id : t.account
      if (accId) balanceMap.set(accId, (balanceMap.get(accId) ?? 0) - (t.amount ?? 0))
    }
  })

  const accountBalances: AccountBalance[] = accounts.map((a: any) => ({
    id: a.id,
    name: a.name,
    currency: a.currency,
    tracksTVA: a.tracksTVA ?? false,
    balance: balanceMap.get(a.id) ?? 0,
  }))

  // Calculate total in MAD
  let totalMAD = 0
  accountBalances.forEach((a) => {
    if (a.currency === 'MAD') {
      totalMAD += a.balance
    } else {
      totalMAD += a.balance * usdToMad
    }
  })

  // Recent transactions
  const recent = [...transactionsResult.docs]
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8)

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
      {/* Total Estimate */}
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

      {/* Account Cards */}
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

      {/* Recent Transactions */}
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
