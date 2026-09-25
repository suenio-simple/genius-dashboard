import { useState } from 'react'
import ActiveCampaigns from '../components/ActiveCampaigns'
import AttentionAlerts from '../components/AttentionAlerts'
import CampaignDetailModal from '../components/CampaignDetailModal'
import KpiCard from '../components/KpiCard'
import LandingLeadsModal from '../components/LandingLeadsModal'
import LandingsPanel from '../components/LandingsPanel'
import { useDashboard } from '../hooks/dashboard.hook'
import { formatMoney, formatNumber, formatPercent } from '../utils/format'

// Las métricas quedan en null cuando su API no responde
const orDash = (value, format) => (value == null ? '—' : format(value))

const timeFormat = new Intl.DateTimeFormat('es-AR', { timeStyle: 'short' })

export default function Dashboard() {
  const {
    currency,
    totalBudget,
    totalSpent,
    totalAvailable,
    spentPercent,
    activeCampaigns,
    activeCampaignList,
    activeLandings,
    landingList,
    registeredCampaigns,
    totalLeads,
    alerts,
    campaignDetailsById,
    loading,
    updatedAt,
    reload,
  } = useDashboard()

  const [selectedCampaignId, setSelectedCampaignId] = useState(null)
  const [selectedLandingId, setSelectedLandingId]   = useState(null)

  return (
    <main className="page">
      <section className="w-full flex flex-col md:flex-row md:items-center md:justify-between md:mb-5">
        <div>
          <h1 className="mb-0">Campañas</h1>
          <p className="text-muted">
            Resumen del estado y rendimiento de tus campañas
          </p>
        </div>
        <div className="mt-5 mb-7 xl:my-0 flex flex-col items-center gap-2 md:flex-row md:gap-3">
          <p className="bg-surface text-muted border border-border p-2 rounded-md shadow-sm flex items-center w-full md:w-fit">
            <span className='bg-green-500 animate-pulse inline-block h-2 w-2 mr-2 rounded-full' aria-hidden='true'></span>
            {loading ? 'Actualizando...' : `Actualizado a las ${timeFormat.format(updatedAt)}`}
          </p>
          <button className="filter-button w-full md:w-fit" onClick={reload} disabled={loading}>Actualizar</button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-7">
        <KpiCard
          label="Presupuesto total"
          value={<span className="font-mono">{orDash(totalBudget, formatMoney)}</span>}
          footer={<span className="text-slate-400 font-mono">{currency} asignado</span>}
        />
        <KpiCard
          label="Total gastado"
          badge={
            <span className="text-xs font-bold text-amber-600 font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
              {orDash(spentPercent, formatPercent)}
            </span>
          }
          value={<span className="font-mono">{orDash(totalSpent, formatMoney)}</span>}
          footer={
            <>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(spentPercent ?? 0, 100)}%` }} />
              </div>
              <span className="text-slate-400 font-mono block mt-1.5">Límite mensual</span>
            </>
          }
        />
        <KpiCard
          label="Total disponible"
          value={<span className="font-mono text-emerald-600">{orDash(totalAvailable, formatMoney)}</span>}
          footer={<span className="text-slate-400 font-mono">{currency} remanente</span>}
        />
        <KpiCard
          label="Campañas activas"
          value={<>{orDash(activeCampaigns, String)} <span className="text-sm font-normal text-muted">activas</span></>}
          footer={<span className="text-emerald-600 font-medium">{orDash(registeredCampaigns, String)} registradas</span>}
        />
        <KpiCard
          label="Total leads"
          value={<>{orDash(totalLeads, formatNumber)} <span className="text-sm font-normal text-muted">leads</span></>}
        />
      </section>

      <AttentionAlerts
        alerts={alerts}
        currency={currency}
        onSelect={(alert) => setSelectedCampaignId(alert.campaignId)}
      />

      {/* Lado a lado en pantallas grandes, una debajo de la otra en chicas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 items-start mb-7">
        <ActiveCampaigns
          campaigns={activeCampaignList}
          onSelect={(campaign) => setSelectedCampaignId(campaign.id)}
        />
        <LandingsPanel
          landings={landingList}
          activeCount={activeLandings}
          onSelect={(landing) => setSelectedLandingId(landing.id)}
        />
      </div>

      <CampaignDetailModal
        campaign={campaignDetailsById.get(selectedCampaignId) ?? null}
        onClose={() => setSelectedCampaignId(null)}
      />

      <LandingLeadsModal
        landing={landingList.find((l) => l.id === selectedLandingId) ?? null}
        onClose={() => setSelectedLandingId(null)}
      />

      {/* TODO GD-F05: agregar selector de cliente para filtrar la vista */}
    </main>
  );
}
