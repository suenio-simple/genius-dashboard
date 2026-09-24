import { ListChecks } from 'lucide-react'
import { formatMoney } from '../utils/format'
import { ListPanel, ListPanelItem } from './ListPanel'

// TODO: pasar onSelect desde el Dashboard para abrir el modal de detalle de la campaña
export default function ActiveCampaigns({ campaigns, onSelect }) {
  return (
    <ListPanel
      icon={ListChecks}
      title="Campañas activas"
      meta={`${campaigns.length} ${campaigns.length === 1 ? 'activa' : 'activas'}`}
      emptyMessage="No hay campañas activas en este momento."
    >
      {campaigns.map((campaign) => {
        const overBudget = campaign.spent > campaign.budget

        return (
          <ListPanelItem
            key={campaign.id}
            title={campaign.name}
            description={
              <>
                {campaign.client} • Gastado:{' '}
                <span className={`font-mono ${overBudget ? 'text-rose-600 font-semibold' : 'text-slate-700'}`}>
                  {formatMoney(campaign.spent)}
                </span>{' '}
                / <span className="font-mono">{formatMoney(campaign.budget)} {campaign.currency}</span>
              </>
            }
            onClick={() => onSelect?.(campaign)}
          />
        )
      })}
    </ListPanel>
  )
}
