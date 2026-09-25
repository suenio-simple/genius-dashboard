import { LayoutTemplate } from 'lucide-react'
import { formatNumber } from '../utils/format'
import { LANDING_STATUS_STYLES } from './LandingLeadsModal'
import { ListPanel, ListPanelItem } from './ListPanel'
import { StatusPill } from './Modal'

// Lista todas las landings (activas primero); las no activas llevan badge de estado para poder ver sus leads igual
export default function LandingsPanel({ landings, activeCount, onSelect }) {
  return (
    <ListPanel
      icon={LayoutTemplate}
      title="Landings"
      meta={`${activeCount} ${activeCount === 1 ? 'activa' : 'activas'} de ${landings.length}`}
      emptyMessage="No hay landings registradas."
    >
      {landings.map((landing) => (
        <ListPanelItem
          key={landing.id}
          title={landing.name}
          badge={landing.status !== 'active' && (
            <StatusPill {...(LANDING_STATUS_STYLES[landing.status] ?? LANDING_STATUS_STYLES.draft)} />
          )}
          description={
            <>
              {landing.client} •{' '}
              <span className={`font-semibold ${landing.leadCount > 0 ? 'text-slate-700' : 'text-slate-500'}`}>
                {formatNumber(landing.leadCount)} {landing.leadCount === 1 ? 'lead' : 'leads'}
              </span>
            </>
          }
          onClick={() => onSelect?.(landing)}
        />
      ))}
    </ListPanel>
  )
}
