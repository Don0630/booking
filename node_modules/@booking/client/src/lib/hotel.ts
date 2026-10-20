// local-date YYYY-MM-DD, `offset` days from today
export function isoDate(offset = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

// add n days to a YYYY-MM-DD string
export function addDays(iso: string, n: number) {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d + n)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

// prices are stored in cents
// Prices are stored in Philippine pesos
export const formatMoney = (price: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(price)