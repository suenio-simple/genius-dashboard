import { useState } from 'react'
import { createCampaign } from '../services/budgetManagerApi'

const CURRENCY = 'ARS'

const STATUS_OPTIONS = [
  { value: 'active',  label: 'Activa' },
  { value: 'paused',  label: 'Pausada' },
  { value: 'closed',  label: 'Cerrada' },
  { value: 'draft',   label: 'Borrador' },
]

const FORM_INICIAL = {
  name: '',
  client: '',
  type: '',
  status: 'draft',
  budget: '',
  startDate: '',
  endDate: '',
}

const validar = (form) => {
  const errores = {}

  if (!form.name.trim()) errores.name   = 'Ingresá el nombre de la campaña.'
  if (!form.client.trim()) errores.client = 'Ingresá el cliente.'
  if (!form.type.trim()) errores.type   = 'Ingresá el tipo de campaña.'

  const budget = Number(form.budget)

  if (form.budget === '' || Number.isNaN(budget)) {
    errores.budget = 'Ingresá un presupuesto válido.'
  } else if (budget <= 0) {
    errores.budget = 'El presupuesto debe ser mayor a 0.'
  }

  if (!form.startDate) errores.startDate = 'Ingresá la fecha de inicio.'
  if (!form.endDate) errores.endDate = 'Ingresá la fecha de fin.'

  if (form.startDate && form.endDate && form.endDate < form.startDate) {
    errores.endDate = 'La fecha de fin no puede ser anterior a la de inicio.'
  }

  return errores
}

const CreateCampaignForm = ({ toggleModal, onCreated }) => {
  const [form, setForm] = useState(FORM_INICIAL)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [errorApi, setErrorApi] = useState(null)

  const handleOnChange = (event) => {
    const { name, value } = event.target

    setForm((actual) => ({ ...actual, [name]: value }))
    setErrores((actuales) => ({ ...actuales, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nuevosErrores = validar(form)
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) return

    setErrorApi(null)
    setEnviando(true)

    try {
      const campaign = await createCampaign({
        name:      form.name.trim(),
        client:    form.client.trim(),
        type:      form.type.trim(),
        status:    form.status,
        budget:    Number(form.budget),
        currency:  CURRENCY,
        startDate: form.startDate,
        endDate:   form.endDate,
      })

      onCreated?.(campaign)
      toggleModal()
    } catch (error) {
      setErrorApi(error.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="overlay" onClick={toggleModal}>
      <article
        className="create-campaign-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div>
          <button
            onClick={toggleModal}
            className="modal-close"
            aria-label="Cerrar"
          >
            x
          </button>

          <h2>Crear campaña</h2>
        </div>

        <form className="campaign-form" onSubmit={handleSubmit} noValidate>
          <section className="form-field">
            <label htmlFor="name">Nombre de la campaña</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleOnChange}
              placeholder="Test Campaign"
              autoFocus
            />
            {errores.name && <span className="form-error">{errores.name}</span>}
          </section>

          <section className="form-field">
            <label htmlFor="client">Cliente</label>
            <input
              type="text"
              name="client"
              id="client"
              value={form.client}
              onChange={handleOnChange}
              placeholder="SuenoSimple"
            />
            {errores.client && (
              <span className="form-error">{errores.client}</span>
            )}
          </section>

          <div className="form-row">
            <section className="form-field">
              <label htmlFor="type">Tipo</label>
              <input
                type="text"
                name="type"
                id="type"
                value={form.type}
                onChange={handleOnChange}
                placeholder="email"
              />
              {errores.type && (
                <span className="form-error">{errores.type}</span>
              )}
            </section>

            <section className="form-field">
              <label htmlFor="status">Estado</label>
              <select
                name="status"
                id="status"
                value={form.status}
                onChange={handleOnChange}
              >
                {STATUS_OPTIONS.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </section>
          </div>

          <div className="form-row">
            <section className="form-field">
              <label htmlFor="budget">Presupuesto</label>
              <input
                type="number"
                name="budget"
                id="budget"
                value={form.budget}
                onChange={handleOnChange}
                min="0"
                step="0.01"
                placeholder="10000"
              />
              {errores.budget && (
                <span className="form-error">{errores.budget}</span>
              )}
            </section>

            <section className="form-field">
              <label htmlFor="currency">Moneda</label>
              <input
                type="text"
                name="currency"
                id="currency"
                value={CURRENCY}
                readOnly
                tabIndex={-1}
              />
            </section>
          </div>

          <div className="form-row">
            <section className="form-field">
              <label htmlFor="startDate">Fecha de inicio</label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={form.startDate}
                onChange={handleOnChange}
              />
              {errores.startDate && (
                <span className="form-error">{errores.startDate}</span>
              )}
            </section>

            <section className="form-field">
              <label htmlFor="endDate">Fecha de fin</label>
              <input
                type="date"
                name="endDate"
                id="endDate"
                value={form.endDate}
                onChange={handleOnChange}
                min={form.startDate || undefined}
              />
              {errores.endDate && (
                <span className="form-error">{errores.endDate}</span>
              )}
            </section>
          </div>

          {errorApi && (
            <p className="form-error">
              No se pudo crear la campaña: {errorApi}
            </p>
          )}

          <footer className="form-actions">
            <button
              type="button"
              className="filter-button secondary"
              onClick={toggleModal}
              disabled={enviando}
            >
              Cancelar
            </button>

            <button type="submit" className="filter-button" disabled={enviando}>
              {enviando ? "Creando..." : "Crear campaña"}
            </button>
          </footer>
        </form>
      </article>
    </div>
  );
}

export default CreateCampaignForm
