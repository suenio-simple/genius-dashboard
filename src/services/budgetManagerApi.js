const BASE = '/api/budget'

export async function getCampaigns(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/campaigns${query ? '?' + query : ''}`)
  if (!res.ok) throw new Error(`Budget Manager: ${res.status}`)
  return res.json()
}

export async function getBudgetSummary() {
  const res = await fetch(`${BASE}/campaigns/summary`)
  if (!res.ok) throw new Error(`Budget Manager: ${res.status}`)
  return res.json()
}

export async function getCampaignBudget(id) {
  const res = await fetch(`${BASE}/campaigns/${id}/budget`)
  if (!res.ok) throw new Error(`Budget Manager: ${res.status}`)
  return res.json()
}
export async function updateCampaignStatus(id, status) {
  const res = await fetch(`${BASE}/campaigns/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || `Budget Manager: ${res.status}`)
  }

  return data
}