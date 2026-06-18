import type { Payload } from 'payload'
import { sql } from 'drizzle-orm'

export type FinancePeriod = 'month' | 'year' | 'all'

export interface AccountSummary {
  id: number
  name: string
  currency: string
  tracksTVA: boolean
  // Income, expense, and net transfers scoped to the selected period.
  income: number
  expense: number
  transferNet: number
  // Current balance — ALWAYS all-time, never scoped to the period.
  balance: number
}

// Start of the selected period in UTC, or null for all-time.
export function periodStart(period: FinancePeriod, now: Date): Date | null {
  if (period === 'month') return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
  if (period === 'year') return new Date(Date.UTC(now.getUTCFullYear(), 0, 1))
  return null
}

// Per-account income/expense/transfers (scoped to `from`..now) plus the
// all-time balance. Pass `from = null` for all-time figures across the board.
export async function getAccountSummaries(
  payload: Payload,
  from: Date | null,
): Promise<AccountSummary[]> {
  const db = (payload.db as { drizzle: { execute: (q: unknown) => Promise<any> } }).drizzle
  // Sentinel epoch date so the period FILTER matches every row in all-time mode.
  const fromDate = from ?? new Date(Date.UTC(1970, 0, 1))

  const [accountsResult, result] = await Promise.all([
    payload.find({ collection: 'accounts', limit: 100, sort: 'name', depth: 0 }),
    db.execute(sql`
      SELECT
        acc_id,
        SUM(income - expense + transfer_in - transfer_out) AS balance,
        SUM(income) FILTER (WHERE txn_date >= ${fromDate}) AS p_income,
        SUM(expense) FILTER (WHERE txn_date >= ${fromDate}) AS p_expense,
        SUM(transfer_in - transfer_out) FILTER (WHERE txn_date >= ${fromDate}) AS p_transfer_net
      FROM (
        SELECT account_id AS acc_id, date AS txn_date, COALESCE(amount, 0) AS income, 0 AS expense, 0 AS transfer_in, 0 AS transfer_out
        FROM transactions WHERE type = 'income' AND account_id IS NOT NULL
        UNION ALL
        SELECT account_id, date, 0, COALESCE(amount, 0), 0, 0
        FROM transactions WHERE type = 'expense' AND account_id IS NOT NULL
        UNION ALL
        SELECT from_account_id, date, 0, 0, 0, COALESCE(from_amount, 0)
        FROM transactions WHERE type = 'transfer' AND from_account_id IS NOT NULL
        UNION ALL
        SELECT to_account_id, date, 0, 0, COALESCE(to_amount, 0), 0
        FROM transactions WHERE type = 'transfer' AND to_account_id IS NOT NULL
      ) parts
      GROUP BY acc_id
    `),
  ])

  const rows: any[] = result.rows ?? result
  const byAccount = new Map<number, any>()
  for (const row of rows) {
    if (row.acc_id != null) byAccount.set(Number(row.acc_id), row)
  }

  return accountsResult.docs.map((a: any) => {
    const row = byAccount.get(a.id)
    return {
      id: a.id,
      name: a.name,
      currency: a.currency,
      tracksTVA: a.tracksTVA ?? false,
      income: row ? parseFloat(row.p_income ?? '0') : 0,
      expense: row ? parseFloat(row.p_expense ?? '0') : 0,
      transferNet: row ? parseFloat(row.p_transfer_net ?? '0') : 0,
      balance: row ? parseFloat(row.balance ?? '0') : 0,
    }
  })
}
