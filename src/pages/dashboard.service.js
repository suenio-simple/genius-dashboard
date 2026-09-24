import {
  DatosGenerales,
  AlertaCritico,
  AlertaAdvertencia,
  AlertaVelocidadDeGasto,
  AlertaClienteSinGasto,
  CampanaActiva,
} from './dashboard.dto';
import { getCampaigns, getGlobalBudgetSummary } from './genius-budget-manager/genius-budget-manager.connector';
import {
  buildCriticalAlert,
  buildWarningAlert,
  buildSpendVelocityAlert,
  buildNoSpendAlert,
  buildActiveCampaigns,
} from './genius-budget-manager/genius-budget-manager.service';
import { getCrmDashboardData } from './genius-crm/genius-crm.service';

// Datos generales
export async function getDatosGenerales() {
  const [summary, crm] = await Promise.all([getGlobalBudgetSummary(), getCrmDashboardData()]);

  return new DatosGenerales({
    presupuesto_total: summary.totalBudget,
    total_gastado: summary.totalSpent,
    porcentaje_de_total_gastado: summary.consumptionPercentage,
    total_disponible: summary.totalAvailable,
    cantidad_de_campana_activas: summary.activeCampaigns,
    total_de_leads: crm.total_de_leads,
  });
}

// Alerta crítico
export async function getAlertaCritico() {
  const campaigns = await getCampaigns({ status: 'active' });
  const alerta = buildCriticalAlert(campaigns);
  return alerta ? new AlertaCritico(alerta) : null;
}

// Alerta advertencia
export async function getAlertaAdvertencia() {
  const campaigns = await getCampaigns({ status: 'active' });
  const alerta = buildWarningAlert(campaigns);
  return alerta ? new AlertaAdvertencia(alerta) : null;
}

// Alerta velocidad de gasto
export async function getAlertaVelocidadDeGasto() {
  const campaigns = await getCampaigns({ status: 'active' });
  const alerta = buildSpendVelocityAlert(campaigns);
  return alerta ? new AlertaVelocidadDeGasto(alerta) : null;
}

// Cliente sin gasto
export async function getAlertaClienteSinGasto() {
  const campaigns = await getCampaigns({ status: 'active' });
  const alerta = buildNoSpendAlert(campaigns);
  return alerta ? new AlertaClienteSinGasto(alerta) : null;
}

// Campañas activas
export async function getCampanasActivas() {
  const campaigns = await getCampaigns({ status: 'active' });
  return buildActiveCampaigns(campaigns).map((campana) => new CampanaActiva(campana));
}
