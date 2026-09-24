import { BellRing, CircleAlert, CirclePause, Gauge, TriangleAlert } from 'lucide-react'
import { formatMoney, formatPercent } from '../utils/format'

const ALERT_STYLES = {
  overBudget: {
    Icon: CircleAlert,
    label: 'Crítica',
    iconBox: 'bg-rose-50 border-rose-100 text-rose-600',
    badge: 'bg-rose-100 text-rose-700',
  },
  nearLimit: {
    Icon: TriangleAlert,
    label: 'Advertencia',
    iconBox: 'bg-amber-50 border-amber-100 text-amber-600',
    badge: 'bg-amber-100 text-amber-800',
  },
  pacing: {
    Icon: Gauge,
    label: 'Pacing',
    iconBox: 'bg-blue-50 border-blue-100 text-accent',
    badge: 'bg-blue-100 text-blue-800',
  },
  noSpend: {
    Icon: CirclePause,
    label: 'Sin gasto',
    iconBox: 'bg-slate-100 border-slate-200 text-slate-600',
    badge: 'bg-slate-200 text-slate-700',
  },
}

function AlertDetail({ alert, currency }) {
  switch (alert.type) {
    case 'overBudget':
      return (
        <>
          Superó presupuesto:{' '}
          <span className="text-rose-600 font-medium font-mono">
            {formatMoney(alert.spent)} / {formatMoney(alert.totalBudget)} {currency}
          </span>{' '}
          (-{formatMoney(alert.excess)})
        </>
      )
    case 'nearLimit':
      return (
        <>
          Cerca de agotar (
          <span className="font-medium text-slate-700">{formatPercent(alert.percentageUsed)} gastado</span> •{' '}
          <span className="font-mono text-slate-600">{formatMoney(alert.remaining)} disponible</span>)
        </>
      )
    case 'pacing':
      return (
        <>
          Gasto acelerado ({Math.round(alert.percentageUsed)}% consumido en solo {Math.round(alert.timePercent)}% del período)
        </>
      )
    case 'noSpend':
      return <>Sin consumo registrado ($ 0 gastado de {formatMoney(alert.totalBudget)} {currency})</>
    default:
      return null
  }
}

// TODO: pasar onSelect desde el Dashboard para abrir el modal de detalle de la campaña
export default function AttentionAlerts({ alerts, currency, onSelect }) {
  return (
    <section className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm mb-7">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <BellRing className="text-slate-700" size={18} aria-hidden="true" />
          <h2 className="m-0 text-sm font-bold text-slate-800">Requiere tu atención</h2>
        </div>
        <span className="text-xs text-slate-400">
          {alerts.length} {alerts.length === 1 ? 'alerta' : 'alertas'}
        </span>
      </div>

      {alerts.length === 0 ? (
        <p className="px-5 py-6 text-sm text-muted">Todo en orden: ninguna campaña activa necesita ajustes.</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {alerts.map((alert) => {
            const { Icon, label, iconBox, badge } = ALERT_STYLES[alert.type]

            return (
              <li key={alert.campaignId}>
                {/* Toda la fila es clickeable; en pantallas chicas el texto hace wrap y "Ver detalle" baja debajo del detalle */}
                <button
                  type="button"
                  onClick={() => onSelect?.(alert)}
                  className="group w-full text-left px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 hover:bg-slate-50/80 focus-visible:bg-slate-50/80 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent transition-colors cursor-pointer"
                >
                  <span className="flex items-start sm:items-center gap-3.5 min-w-0">
                    <span className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${iconBox}`}>
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap sm:flex-nowrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold text-slate-900 group-hover:text-accent transition-colors sm:truncate">{alert.campaignName}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${badge}`}>{label}</span>
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5 sm:truncate">
                        {alert.client} • <AlertDetail alert={alert} currency={currency} />
                      </span>
                    </span>
                  </span>
                  <span className="self-start sm:self-auto ml-[42px] sm:ml-0 text-xs font-semibold text-accent group-hover:text-blue-700 px-3 py-1.5 rounded-lg group-hover:bg-blue-50 transition-colors shrink-0">
                    Ver detalle
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
