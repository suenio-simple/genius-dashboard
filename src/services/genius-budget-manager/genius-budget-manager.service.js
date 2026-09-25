import { getCampaigns, getBudgetSummary } from '../budgetManagerApi';

export const CRITICAL_THRESHOLD = 90;
export const WARNING_THRESHOLD = 70;
export const VELOCITY_GAP_THRESHOLD = 15;

export function calculatePercentageUsed(campaign) {
  if (!campaign.budget) return 0;
  return (campaign.spent / campaign.budget) * 100;
}

export function calculatePeriodElapsedPercentage(campaign, now = Date.now()) {
  const start = new Date(campaign.startDate).getTime();
  const end = new Date(campaign.endDate).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return null;
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
}

export function buildActiveCampaigns(campaigns) {
  return campaigns.map((campaign) => ({
    nombre_de_cliente: campaign.client,
    total_gastado: campaign.spent,
    presupuesto_asignado: campaign.budget,
  }));
}

export function buildCriticalAlert(campaigns) {
  return campaigns
    .map((campaign) => ({ campaign, pct: calculatePercentageUsed(campaign) }))
    .filter(({ pct }) => pct >= CRITICAL_THRESHOLD)
    .sort((a, b) => b.pct - a.pct)
    .map(({ campaign }) => ({
      nombre_de_cliente: campaign.client,
      descripcion: 'El presupuesto está próximo a agotarse',
      presupuesto: campaign.budget,
      total_gastado: campaign.spent,
    }));
}

export function buildWarningAlert(campaigns) {
  return campaigns
    .map((campaign) => ({ campaign, pct: calculatePercentageUsed(campaign) }))
    .filter(({ pct }) => pct >= WARNING_THRESHOLD && pct < CRITICAL_THRESHOLD)
    .sort((a, b) => b.pct - a.pct)
    .map(({ campaign, pct }) => ({
      nombre_de_cliente: campaign.client,
      descripcion: 'El cliente está utilizando gran parte del presupuesto',
      porcentaje_gastado_del_total: pct,
      total_disponible: campaign.budget - campaign.spent,
    }));
}

export function buildSpendVelocityAlert(campaigns, now = Date.now()) {
  return campaigns
    .map((campaign) => {
      const periodPct = calculatePeriodElapsedPercentage(campaign, now);
      const spentPct = calculatePercentageUsed(campaign);
      return { campaign, periodPct, spentPct, gap: periodPct === null ? null : spentPct - periodPct };
    })
    .filter(({ gap }) => gap !== null && gap >= VELOCITY_GAP_THRESHOLD)
    .sort((a, b) => b.gap - a.gap)
    .map(({ campaign, periodPct, spentPct }) => ({
      nombre_de_cliente: campaign.client,
      descripcion: 'El gasto está avanzando más rápido que el período',
      porcentaje_de_plata_consumido: spentPct,
      porcentaje_de_periodo_usado: periodPct,
    }));
}

export function buildNoSpendAlert(campaigns) {
  return campaigns
    .filter((campaign) => campaign.spent === 0)
    .map((campaign) => ({
      nombre_de_cliente: campaign.client,
      descripcion: 'El cliente todavía no registra gastos',
      porcentaje_del_total_gastado: 0,
      total_disponible: campaign.budget,
    }));
}

export async function getBudgetManagerDashboardData() {
  const [summary, activeCampaigns] = await Promise.all([
    getBudgetSummary(),
    getCampaigns({ status: 'active' }),
  ]);

  return {
    presupuesto_total: summary.totalBudget,
    total_gastado: summary.totalSpent,
    porcentaje_de_total_gastado: summary.consumptionPercentage,
    total_disponible: summary.totalAvailable,
    cantidad_de_campana_activas: summary.activeCampaigns,
    alerta_critico: buildCriticalAlert(activeCampaigns),
    alerta_advertencia: buildWarningAlert(activeCampaigns),
    alerta_velocidad_de_gasto: buildSpendVelocityAlert(activeCampaigns),
    alerta_cliente_sin_gasto: buildNoSpendAlert(activeCampaigns),
    campanas_activas: buildActiveCampaigns(activeCampaigns),
  };
}
