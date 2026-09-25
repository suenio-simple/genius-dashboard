const BASE = '/api/crm'

export async function getLandings(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/landings${query ? '?' + query : ''}`)
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res.json()
}

export async function getLeadsSummary() {
  const res = await fetch(`${BASE}/landings/summary`)
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res.json()
}

export async function getLandingLeads(id) {
  const res = await fetch(`${BASE}/landings/${id}/leads`)
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res.json()
}

export async function getLandingById(id) {
  const res = await fetch(`${BASE}/landings/${id}`)
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res.json()
}

export async function createLanding(landing) {
  const res = await fetch(`${BASE}/landings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(landing),
  })
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res.json()
}

export async function getLandingPreview(id) {
  const res = await fetch(`${BASE}/landings/${id}/preview`)
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res.text()
}

export async function createLead(id, lead) {
  const res = await fetch(`${BASE}/landings/${id}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`)
  return res.json()
}
