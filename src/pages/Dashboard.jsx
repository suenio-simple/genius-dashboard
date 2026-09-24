import { useEffect, useState } from 'react'
import { getBudgetSummary } from '../services/budgetManagerApi'
import { getLeadsSummary } from '../services/landingCrmApi'

export default function Dashboard() {
  const [budgetSummary, setBudgetSummary] = useState(null)
  const [leadsSummary, setLeadsSummary]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    Promise.all([getBudgetSummary(), getLeadsSummary()])
      .then(([budget, leads]) => {
        setBudgetSummary(budget)
        setLeadsSummary(leads)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="state-msg">Cargando...</p>
  if (error)   return <p className="state-msg error">Error al conectar con las APIs: {error.message}</p>

  const totalLeads = leadsSummary.reduce((sum, l) => sum + (l.leadCount ?? 0), 0)

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
            Actualizado hace 2 min
          </p>
          <button className="filter-button w-full md:w-fit">Actualizar</button>
        </div>
      </section>

      {/* TODO GD-F04: completar tarjetas de indicadores globales */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Campañas activas</div>
          <div className="kpi-value">
            {budgetSummary?.activeCampaigns ?? "—"}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Presupuesto total</div>
          <div className="kpi-value">
            {budgetSummary?.totalBudget != null
              ? `$${budgetSummary.totalBudget.toLocaleString()}`
              : "—"}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total gastado</div>
          <div className="kpi-value">
            {budgetSummary?.totalSpent != null
              ? `$${budgetSummary.totalSpent.toLocaleString()}`
              : "—"}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total leads</div>
          <div className="kpi-value">{totalLeads}</div>
        </div>
      </div>

      {/* TODO GD-F05: agregar selector de cliente para filtrar la vista */}
    </main>
  );
}
