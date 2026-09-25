import {
  DatosGenerales,
  AlertaCritico,
  AlertaAdvertencia,
  AlertaVelocidadDeGasto,
  AlertaClienteSinGasto,
  CampanaActiva,
} from './dashboard.dto';
import { getCampaigns, getBudgetSummary } from '../budgetManagerApi';
import {
  buildCriticalAlert,
  buildWarningAlert,
  buildSpendVelocityAlert,
  buildNoSpendAlert,
  buildActiveCampaigns,
} from '../genius-budget-manager/genius-budget-manager.service';
import { getCrmDashboardData } from '../genius-crm/genius-crm.service';

// Datos generales
export async function getDatosGenerales() {
  const [summary, crm] = await Promise.all([getBudgetSummary(), getCrmDashboardData()]);

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
  return buildCriticalAlert(campaigns).map((alerta) => new AlertaCritico(alerta));
}

// Alerta advertencia
export async function getAlertaAdvertencia() {
  const campaigns = await getCampaigns({ status: 'active' });
  return buildWarningAlert(campaigns).map((alerta) => new AlertaAdvertencia(alerta));
}

// Alerta velocidad de gasto
export async function getAlertaVelocidadDeGasto() {
  const campaigns = await getCampaigns({ status: 'active' });
  return buildSpendVelocityAlert(campaigns).map((alerta) => new AlertaVelocidadDeGasto(alerta));
}

// Cliente sin gasto
export async function getAlertaClienteSinGasto() {
  const campaigns = await getCampaigns({ status: 'active' });
  return buildNoSpendAlert(campaigns).map((alerta) => new AlertaClienteSinGasto(alerta));
}

// Campañas activas
export async function getCampanasActivas() {
  const campaigns = await getCampaigns({ status: 'active' });
  return buildActiveCampaigns(campaigns).map((campana) => new CampanaActiva(campana));
}
