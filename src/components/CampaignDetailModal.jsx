import { useEffect, useRef } from 'react'
import { Lightbulb, X } from 'lucide-react'
import { formatMoney, formatPercent } from '../utils/format'

const STATUS_STYLES = {
  active: { label: 'Activa',   pill: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
  paused: { label: 'Pausada',  pill: 'bg-amber-100 text-amber-800',     dot: 'bg-amber-500' },
  closed: { label: 'Cerrada',  pill: 'bg-slate-200 text-slate-700',     dot: 'bg-slate-500' },
  draft:  { label: 'Borrador', pill: 'bg-slate-100 text-slate-600',     dot: 'bg-slate-400' },
}

// 'YYYY-MM-DD' -> 'DD/MM/YYYY' sin pasar por Date para evitar corrimientos de zona horaria
const formatDate = (date) => date.split('-').reverse().join('/')

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

function progressColor(percentageUsed) {
  if (percentageUsed > 100) return 'bg-rose-500'
  if (percentageUsed >= 90) return 'bg-amber-500'
  return 'bg-emerald-500'
}

function periodText({ phase, elapsedDays, remainingDays }) {
  if (phase === 'upcoming') return `Comienza en ${remainingDays === 1 ? '1 día' : `${remainingDays} días`}`
  if (phase === 'finished') return 'Período finalizado'
  return `${elapsedDays} días transcurridos / ${remainingDays} restantes`
}

function insightText(campaign) {
  const { alert, percentageUsed, period, currency } = campaign

  switch (alert?.type) {
    case 'overBudget':
      return `La campaña superó el presupuesto asignado en ${formatMoney(alert.excess)} ${currency}. Se recomienda pausarla o validar la facturación.`
    case 'nearLimit':
      return `Se ejecutó el ${formatPercent(percentageUsed)} del presupuesto. Conviene ampliar fondos o reducir la inversión diaria para no agotarlo antes de tiempo.`
    case 'pacing':
      return `Pacing acelerado: se gastó el ${Math.round(percentageUsed)}% del presupuesto en solo el ${Math.round(period.timePercent)}% del período. Conviene ajustar el límite diario para evitar que se apague antes de tiempo.`
    case 'noSpend':
      return 'Campaña sin consumo registrado. Se sugiere revisar su configuración o la integración con la plataforma de anuncios.'
    default:
      return campaign.status === 'active' ? 'Ritmo de gasto en línea con el período de la campaña.' : null
  }
}

export default function CampaignDetailModal({ campaign, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (campaign && !dialog.open) dialog.showModal()
    if (!campaign && dialog.open) dialog.close()
  }, [campaign])

  // Fallback de light dismiss para navegadores sin soporte de closedby (Safari)
  const handleClick = (event) => {
    const dialog = dialogRef.current
    if ('closedBy' in HTMLDialogElement.prototype || event.target !== dialog) return

    const rect = dialog.getBoundingClientRect()
    const insideDialog =
      rect.top <= event.clientY && event.clientY <= rect.bottom &&
      rect.left <= event.clientX && event.clientX <= rect.right

    if (!insideDialog) dialog.close()
  }

  const status  = campaign && (STATUS_STYLES[campaign.status] ?? STATUS_STYLES.draft)
  const insight = campaign && insightText(campaign)

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="campaign-detail-title"
      onClose={onClose}
      onClick={handleClick}
      className="m-auto w-[min(36rem,calc(100%-2rem))] max-h-[calc(100dvh-3rem)] overflow-y-auto rounded-xl border border-border bg-surface p-0 shadow-xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm"
    >
      {campaign && (
        <>
          <header className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-slate-200 text-slate-700">
                  {capitalize(campaign.type)}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${status.pill}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} aria-hidden="true" />
                  {status.label}
                </span>
              </div>
              <h2 id="campaign-detail-title" className="m-0 text-lg font-bold text-slate-900">
                {campaign.name} — {campaign.client}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current.close()}
              aria-label="Cerrar"
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>

          <div className="p-6 space-y-5">
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100">
              <div>
                <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Presupuesto</dt>
                <dd className="text-base font-bold text-slate-900 font-mono mt-0.5">
                  {formatMoney(campaign.budget)} {campaign.currency}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total gastado</dt>
                <dd className="text-base font-bold text-slate-900 font-mono mt-0.5">
                  {formatMoney(campaign.spent)} {campaign.currency}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Disponible</dt>
                <dd className={`text-base font-bold font-mono mt-0.5 ${campaign.available < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {campaign.available < 0 && '-'}{formatMoney(Math.abs(campaign.available))} {campaign.currency}
                </dd>
              </div>
            </dl>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-500 font-medium">Porcentaje consumido</span>
                <span className="font-bold text-slate-900 font-mono">{formatPercent(campaign.percentageUsed)}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${progressColor(campaign.percentageUsed)}`}
                  style={{ width: `${Math.min(campaign.percentageUsed, 100)}%` }}
                />
              </div>
            </div>

            <dl className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5">
                <dt className="font-medium text-slate-500">Período de ejecución</dt>
                <dd className="font-mono font-medium text-slate-900">
                  {formatDate(campaign.startDate)} – {formatDate(campaign.endDate)}
                </dd>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5 border-t border-slate-200/60 pt-2">
                <dt className="font-medium text-slate-500">Tiempo transcurrido</dt>
                <dd className="font-mono text-slate-700">{periodText(campaign.period)}</dd>
              </div>
            </dl>

            {insight && (
              <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
                <Lightbulb className="text-accent shrink-0 mt-0.5" size={18} aria-hidden="true" />
                <p className="m-0 text-xs text-slate-700 leading-relaxed">{insight}</p>
              </div>
            )}
          </div>

          <footer className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current.close()}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </footer>
        </>
      )}
    </dialog>
  )
}
