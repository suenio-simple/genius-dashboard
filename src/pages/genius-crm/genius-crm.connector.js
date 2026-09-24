import { LandingDTO, LandingSummaryDTO, LeadDTO } from './genius-crm.dto';

const BASE = '/api/crm/landings';

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`);
  return res.json();
}

export async function getLandings() {
  const data = await request(BASE);
  return data.map((landing) => new LandingDTO(landing));
}

export async function getLandingsSummary() {
  const data = await request(`${BASE}/summary`);
  return data.map((landing) => new LandingSummaryDTO(landing));
}

export async function getLandingById(id) {
  const data = await request(`${BASE}/${id}`);
  return new LandingDTO(data);
}

export async function createLanding({ templateId, name, client, fields }) {
  const data = await request(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ templateId, name, client, fields }),
  });
  return new LandingDTO(data);
}

export async function getLandingPreview(id) {
  const res = await fetch(`${BASE}/${id}/preview`);
  if (!res.ok) throw new Error(`Landing CRM: ${res.status}`);
  return res.text();
}

export async function getLandingLeads(id) {
  const data = await request(`${BASE}/${id}/leads`);
  return data.map((lead) => new LeadDTO(lead));
}

export async function createLead(id, { name, email, phone, message }) {
  const data = await request(`${BASE}/${id}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, message }),
  });
  return new LeadDTO(data);
}
