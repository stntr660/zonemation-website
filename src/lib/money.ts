// Pure money formatter, safe to use on both server and client.
export function formatMoney(amount: number, currency: string): string {
  const formatted = Math.abs(amount).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const symbol =
    currency === 'MAD' ? 'DH' : currency === 'USDT' ? 'USDT' : currency === 'EUR' ? '€' : '$'
  return currency === 'MAD' ? `${formatted} ${symbol}` : `${symbol}${formatted}`
}
