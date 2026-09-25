const numberFormat  = new Intl.NumberFormat('es-AR')
const percentFormat = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export const formatNumber  = (value) => numberFormat.format(value)
export const formatMoney   = (value) => `$ ${numberFormat.format(value)}`
export const formatPercent = (value) => `${percentFormat.format(value)}%`

const dateTimeFormat = new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'short' })

// 'YYYY-MM-DD' -> 'DD/MM/YYYY' sin pasar por Date para evitar corrimientos de zona horaria
export const formatDate     = (date) => date.split('-').reverse().join('/')
export const formatDateTime = (isoDate) => dateTimeFormat.format(new Date(isoDate))
