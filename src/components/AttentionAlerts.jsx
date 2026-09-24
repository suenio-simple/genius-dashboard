import { BellRing, CircleAlert, CirclePause, Gauge, TriangleAlert } from 'lucide-react'
import { formatMoney, formatPercent } from '../utils/format'
import { ListPanel, ListPanelItem } from './ListPanel'

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
    <ListPanel
      icon={BellRing}
      title="Requiere tu atención"
      meta={`${alerts.length} ${alerts.length === 1 ? 'alerta' : 'alertas'}`}
      emptyMessage="Todo en orden: ninguna campaña activa necesita ajustes."
      className="mb-7"
    >
      {alerts.map((alert) => {
        const { Icon, label, iconBox, badge } = ALERT_STYLES[alert.type]

        return (
          <ListPanelItem
            key={alert.campaignId}
            leading={
              <span className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${iconBox}`}>
                <Icon size={20} aria-hidden="true" />
              </span>
            }
            title={alert.campaignName}
            badge={<span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${badge}`}>{label}</span>}
            description={<>{alert.client} • <AlertDetail alert={alert} currency={currency} /></>}
            onClick={() => onSelect?.(alert)}
          />
        )
      })}
    </ListPanel>
  )
}
