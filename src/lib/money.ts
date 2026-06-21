// Pure money formatter, safe to use on both server and client.
export function formatMoney(amount: number, currency: string): string {
  const formatted = Math.abs(amount).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  // Multi-letter codes (DH, USDT) read better after the amount, with a space.
  // Single-char symbols ($, €) keep the conventional prefix.
  if (currency === 'MAD') return `${formatted} DH`
  if (currency === 'USDT') return `${formatted} USDT`
  if (currency === 'EUR') return `€${formatted}`
  return `$${formatted}`
}
