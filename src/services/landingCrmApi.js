const BASE = '/api/crm'

async function request(path, { method = 'GET', body, parse = 'json' } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res[parse]()
}

// Ojo: el backend devuelve leadCount en 0 en este listado; el conteo real sale de getLeadsSummary()
export function getLandings(params = {}) {
  const query = new URLSearchParams(params).toString()
  return request(`/landings${query ? '?' + query : ''}`)
}

export const getLandingById    = (id) => request(`/landings/${id}`)
export const createLanding     = (landing) => request('/landings', { method: 'POST', body: landing })
export const getLandingPreview = (id) => request(`/landings/${id}/preview`, { parse: 'text' })

// [{ id, name, client, status, leadCount }]
export const getLeadsSummary = () => request('/landings/summary')

export const getLandingLeads = (id) => request(`/landings/${id}/leads`)
export const createLead      = (id, lead) => request(`/landings/${id}/leads`, { method: 'POST', body: lead })
