const numberFormat  = new Intl.NumberFormat('es-AR')
const percentFormat = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export const formatNumber  = (value) => numberFormat.format(value)
export const formatMoney   = (value) => `$ ${numberFormat.format(value)}`
export const formatPercent = (value) => `${percentFormat.format(value)}%`
