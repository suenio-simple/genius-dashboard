const BASE = "/api/budget";

export async function getCampaigns(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/campaigns${query ? "?" + query : ""}`);
  if (!res.ok) throw new Error(`Budget Manager: ${res.status}`);
  return res.json();
}

export async function getBudgetSummary() {
  const response = await fetch('/api/budget/campaigns/summary')

  if (!response.ok) {
    throw new Error('Error al obtener resumen de presupuesto')
  }

  return response.json()
}

export async function getCampaignBudget(id) {
  const res = await fetch(`${BASE}/campaigns/${id}/budget`);
  if (!res.ok) throw new Error(`Budget Manager: ${res.status}`);
  return res.json();
}

export async function updateCampaignStatus(id, status) {
  const res = await fetch(`${BASE}/campaigns/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  if (!res.ok) {
    throw new Error(`Budget Manager: ${res.status}`)
  }

  return res.json()
}

export async function createCampaign(campaign) {
  const res = await fetch(`${BASE}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(campaign),
  });
  if (!res.ok) throw new Error(`Budget Manager: ${res.status}`);
  return res.json();
}