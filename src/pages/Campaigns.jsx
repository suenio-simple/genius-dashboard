import { useEffect, useMemo, useState } from 'react'
import {
  getCampaigns,
  updateCampaignStatus,
} from '../services/budgetManagerApi'

const STATUS_BADGE = {
  active: 'badge-active',
  paused: 'badge-paused',
  completed: 'badge-closed',
  draft: 'badge-draft',
}

const CAMPAIGN_STATUS = [
  'draft',
  'active',
  'paused',
  'closed',
]
export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [busquedaCliente, setBusquedaCliente] = useState('')
  const [filtroCliente, setFiltroCliente] = useState('')

  useEffect(() => {
    getCampaigns()
      .then(setCampaigns)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const campaignsFiltradas = useMemo(() => {
    const texto = filtroCliente.trim().toLowerCase()

    if (!texto) return campaigns

    return campaigns.filter(campaign =>
      campaign.client?.toLowerCase().includes(texto)
    )
  }, [campaigns, filtroCliente])

  const buscarCliente = event => {
    event.preventDefault()
    setFiltroCliente(busquedaCliente)
  }

  const limpiarFiltro = () => {
    setBusquedaCliente('')
    setFiltroCliente('')
  }

  const handleStatusChange = async (id, status) => {
    try {
      await updateCampaignStatus(id, status)

      setCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === id
            ? { ...campaign, status }
            : campaign
        )
      )
    } catch (err) {
      console.error('Error al actualizar el estado:', err)
      setError(err)
    }
  }

  if (loading) {
    return (
      <p className="state-msg">
        Cargando campañas...
      </p>
    )
  }

  if (error) {
    return (
      <p className="state-msg error">
        Error: {error.message}
      </p>
    )
  }

  return (
    <main className="page">
      <h1>Campañas</h1>

      <form
        className="campaign-filters"
        onSubmit={buscarCliente}
      >
        <input
          type="search"
          className="filter-input"
          placeholder="Buscar por cliente..."
          value={busquedaCliente}
          onChange={event =>
            setBusquedaCliente(event.target.value)
          }
          aria-label="Buscar campañas por cliente"
        />

        <button
          type="submit"
          className="filter-button"
        >
          Buscar
        </button>

        {filtroCliente && (
          <button
            type="button"
            className="filter-button secondary"
            onClick={limpiarFiltro}
          >
            Limpiar
          </button>
        )}
      </form>

      <div className="item-list">
        {campaignsFiltradas.length === 0 && (
          <p className="state-msg">
            {filtroCliente
              ? `No se encontraron campañas para el cliente "${filtroCliente}".`
              : 'No hay campañas registradas.'}
          </p>
        )}

        {campaignsFiltradas.map(c => (
          <div
            key={c.id}
            className="item-card"
          >
            <div>
              <div className="item-name">
                {c.name}
              </div>

              <div className="item-meta">
                {c.client} · {c.type}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <select
                className={`badge ${
                  STATUS_BADGE[c.status] ?? 'badge-draft'
                }`}
                value={c.status}
                onChange={event =>
                  handleStatusChange(
                    c.id,
                    event.target.value
                  )
                }
              >
                {CAMPAIGN_STATUS.map(status => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>

              <div
                className="item-meta"
                style={{ marginTop: 6 }}
              >
                $
                {(c.budget ?? 0).toLocaleString()}{' '}
                presupuesto
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}