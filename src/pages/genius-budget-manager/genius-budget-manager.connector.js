import { CampaignDTO, GlobalBudgetSummaryDTO, BudgetSummaryDTO, ExpenseDTO } from './genius-budget-manager.dto';

const BASE = '/api/budget/campaigns';

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Budget Manager: ${res.status}`);
  return res.json();
}

export async function getCampaigns({ status, client } = {}) {
  const query = new URLSearchParams({
    ...(status && { status }),
    ...(client && { client }),
  }).toString();
  const data = await request(`${BASE}${query ? `?${query}` : ''}`);
  return data.map((campaign) => new CampaignDTO(campaign));
}

export async function createCampaign({ name, client, type, status, budget, spent, currency, startDate, endDate }) {
  const data = await request(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, client, type, status, budget, spent, currency, startDate, endDate }),
  });
  return new CampaignDTO(data);
}

export async function getGlobalBudgetSummary() {
  const data = await request(`${BASE}/summary`);
  return new GlobalBudgetSummaryDTO(data);
}

export async function getCampaignById(id) {
  const data = await request(`${BASE}/${id}`);
  return new CampaignDTO(data);
}

export async function getBudgetSummary(id) {
  const data = await request(`${BASE}/${id}/summary`);
  return new BudgetSummaryDTO(data);
}

export async function getExpenses(id) {
  const data = await request(`${BASE}/${id}/expenses`);
  return data.map((expense) => new ExpenseDTO(expense));
}

export async function addExpense(id, { description, amount, category, date }) {
  const data = await request(`${BASE}/${id}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description, amount, category, date }),
  });
  return new ExpenseDTO(data);
}

export async function updateBudget(id, { budget }) {
  const data = await request(`${BASE}/${id}/budget`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ budget }),
  });
  return new CampaignDTO(data);
}

export async function updateStatus(id, { status }) {
  const data = await request(`${BASE}/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return new CampaignDTO(data);
}
