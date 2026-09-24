const BASE = '/api/crm'

export async function getLandings(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/landings${query ? '?' + query : ''}`)
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res.json()
}

export async function getLeadsSummary() {
  const response = await fetch('/api/crm/landings/summary')

  if (!response.ok) {
    throw new Error('Error al obtener resumen de leads')
  }

  return response.json()
}
export async function getLandingLeads(id) {
  const res = await fetch(`${BASE}/landings/${id}/leads`)
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res.json()
}
