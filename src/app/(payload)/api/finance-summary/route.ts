import config from '@/payload.config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { getAccountSummaries, periodStart, type FinancePeriod } from '@/lib/financeSummary'

// Per-account income/expense/transfers for a period, plus the all-time solde.
// Auth-gated: finance data is only returned to a logged-in admin user.
export async function GET(req: NextRequest) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const requested = req.nextUrl.searchParams.get('period')
  const period: FinancePeriod = requested === 'month' || requested === 'year' ? requested : 'all'
  const from = periodStart(period, new Date())

  const accounts = await getAccountSummaries(payload, from)
  return NextResponse.json({ period, accounts })
}
