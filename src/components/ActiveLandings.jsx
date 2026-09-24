import { LayoutTemplate } from 'lucide-react'
import { formatNumber } from '../utils/format'
import { ListPanel, ListPanelItem } from './ListPanel'

// TODO: pasar onSelect desde el Dashboard para abrir el modal de detalle de la landing
export default function ActiveLandings({ landings, onSelect }) {
  return (
    <ListPanel
      icon={LayoutTemplate}
      title="Landings activas"
      meta={`${landings.length} ${landings.length === 1 ? 'activa' : 'activas'}`}
      emptyMessage="No hay landings activas en este momento."
    >
      {landings.map((landing) => (
        <ListPanelItem
          key={landing.id}
          title={landing.name}
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
