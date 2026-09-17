import { useEffect, useMemo, useState } from 'react'
import { getCampaigns } from '../services/budgetManagerApi'
import CreateCampaignForm from '../components/CreateCampaignForm'

const STATUS_BADGE = {
  activa:   'badge-active',
  pausada:  'badge-paused',
  cerrada:  'badge-closed',
  borrador: 'badge-draft',
}

const CAMPAIGN_STATUS = [
  'draft',
  'active',
  'paused',
  'completed'
]

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  const [busquedaCliente, setBusquedaCliente] = useState('')
  const [filtroCliente, setFiltroCliente] = useState('')

  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

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

  const buscarCliente = (event) => {
    event.preventDefault()
    setFiltroCliente(busquedaCliente)
  }

  const limpiarFiltro = () => {
    setBusquedaCliente('')
    setFiltroCliente('')
  }

  const toggleModal = () => {
    setShowCreateCampaign(!showCreateCampaign);
  }

  const agregarCampaign = (campaign) => {
    setCampaigns((actuales) => [...actuales, campaign])
  }

  const handleStatusChange = async (id, status) => {
    try {
      // Aquí podrías llamar a la API para actualizar el estado de la campaña en el backend
      // await updateCampaign(id, { status })

      setCampaigns(prev =>
        prev.map(campaign =>
          campaign.id === id
            ? { ...campaign, status }
            : campaign
        )
      )
    } catch (error) {
      console.error('Error al actualizar el estado:', error)
    }
  }

  if (loading) {
    return <p className="state-msg">Cargando campañas...</p>
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

      <section className="campaign-actions">
        <form className="campaign-filters" onSubmit={buscarCliente}>
          <input
            type="search"
            className="filter-input"
            placeholder="Buscar por cliente..."
            value={busquedaCliente}
            onChange={(event) => setBusquedaCliente(event.target.value)}
            aria-label="Buscar campañas por cliente"
          />

          <button type="submit" className="filter-button">
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

        <button 
          className="filter-button"
          onClick={toggleModal}
        >
          + Agregar campaña
        </button>
      </section>

      <div className="item-list">
        {campaignsFiltradas.length === 0 && (
          <p className="state-msg">
            {filtroCliente
              ? `No se encontraron campañas para el cliente "${filtroCliente}".`
              : "No hay campañas registradas."}
          </p>
        )}

        {/* el id no es confiable como key: el backend puede repetirlo */}
        {campaignsFiltradas.map((c, indice) => (
          <div key={`${c.id}-${indice}`} className="item-card">
            <div>
              <div className="item-name">{c.name}</div>

              <div className="item-meta">
                {c.client} · {c.type}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <select
                className={`badge ${STATUS_BADGE[c.status] ?? 'badge-draft'}`}
                value={c.status}
                onChange={e => handleStatusChange(c.id, e.target.value)}
              >
                {CAMPAIGN_STATUS.map(status => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <div className="item-meta" style={{ marginTop: 6 }}>
                ${(c.budget ?? 0).toLocaleString()} presupuesto
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateCampaign && (
        <CreateCampaignForm
          toggleModal={toggleModal}
          onCreated={agregarCampaign}
        />
      )}
    </main>
  );
}