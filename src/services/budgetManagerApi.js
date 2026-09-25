const BASE = '/api/budget'

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`Budget Manager: ${res.status}`)
  return res.json()
}

// El filtro ?status= del backend compara contra el tipo y no contra el estado: filtrar en el front
export function getCampaigns(params = {}) {
  const query = new URLSearchParams(params).toString()
  return request(`/campaigns${query ? '?' + query : ''}`)
}

export const getCampaignById      = (id) => request(`/campaigns/${id}`)
export const createCampaign       = (campaign) => request('/campaigns', { method: 'POST', body: campaign })
export const updateCampaignStatus = (id, status) => request(`/campaigns/${id}/status`, { method: 'PUT', body: { status } })
export const updateCampaignBudget = (id, budget) => request(`/campaigns/${id}/budget`, { method: 'PUT', body: { budget } })

// Resumen global de las campañas activas: { activeCampaigns, totalBudget, totalSpent, totalAvailable, consumptionPercentage }
export const getBudgetSummary = () => request('/campaigns/summary')

// Resumen de una campaña: { campaignId, campaignName, client, totalBudget, spent, remaining, percentageUsed }
export const getCampaignSummary = (id) => request(`/campaigns/${id}/summary`)

export const getCampaignExpenses = (id) => request(`/campaigns/${id}/expenses`)
export const addCampaignExpense  = (id, expense) => request(`/campaigns/${id}/expenses`, { method: 'POST', body: expense })
