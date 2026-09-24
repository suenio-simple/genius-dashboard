import { getLandingsSummary, getLandingLeads } from './genius-crm.connector';

export function calculateTotalLeads(landings) {
  return landings.reduce((total, landing) => total + landing.leadCount, 0);
}

export function calculateActiveLandingsCount(landings) {
  return landings.filter((landing) => landing.status === 'active').length;
}

export function calculateAverageLeadsPerLanding(landings) {
  if (!landings.length) return 0;
  return calculateTotalLeads(landings) / landings.length;
}

export function buildLeadsByClient(landings) {
  const totalsByClient = landings.reduce((acc, landing) => {
    acc.set(landing.client, (acc.get(landing.client) ?? 0) + landing.leadCount);
    return acc;
  }, new Map());

  return [...totalsByClient.entries()]
    .map(([nombre_de_cliente, total_de_leads]) => ({ nombre_de_cliente, total_de_leads }))
    .sort((a, b) => b.total_de_leads - a.total_de_leads);
}

export function buildLandingsBreakdown(landings) {
  return landings.map((landing) => ({
    nombre_de_cliente: landing.client,
    nombre_landing: landing.name,
    estado: landing.status,
    cantidad_de_leads: landing.leadCount,
  }));
}

export async function getCrmDashboardData() {
  const landings = await getLandingsSummary();

  return {
    total_de_leads: calculateTotalLeads(landings),
    cantidad_de_landings: landings.length,
    cantidad_de_landings_activas: calculateActiveLandingsCount(landings),
    promedio_de_leads_por_landing: calculateAverageLeadsPerLanding(landings),
    leads_por_cliente: buildLeadsByClient(landings),
    landings: buildLandingsBreakdown(landings),
  };
}

export async function getLandingLeadsDetail(landingId) {
  const leads = await getLandingLeads(landingId);

  return leads.map((lead) => ({
    nombre: lead.name,
    email: lead.email,
    telefono: lead.phone,
    mensaje: lead.message,
    fecha_de_registro: lead.createdAt,
  }));
}
