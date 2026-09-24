// Datos mockeados con la forma de las respuestas reales de las APIs.
// TODO: reemplazar por getCampaigns(), getBudgetSummary() y getLeadsSummary() al conectar el dashboard.

// GET /api/budget/campaigns
export const campaigns = [
  { id: 1, name: 'Email Recupero de Carritos',  client: 'SuenoSimple', type: 'email',   status: 'active', budget: 30000,  spent: 12400,  currency: 'ARS', startDate: '2026-08-01', endDate: '2026-10-31' },
  { id: 2, name: 'Google Ads Conversión',       client: 'FinanzasYa',  type: 'search',  status: 'active', budget: 380000, spent: 345000, currency: 'ARS', startDate: '2026-09-01', endDate: '2026-09-30' },
  { id: 3, name: 'Search Black Friday',         client: 'TechStore',   type: 'search',  status: 'active', budget: 200000, spent: 215000, currency: 'ARS', startDate: '2026-09-10', endDate: '2026-09-30' },
  { id: 4, name: 'Lanzamiento Colección Otoño', client: 'ModaExpress', type: 'social',  status: 'active', budget: 280000, spent: 182000, currency: 'ARS', startDate: '2026-09-18', endDate: '2026-10-12' },
  { id: 5, name: 'Reactivación Clientes VIP',   client: 'AutoSur',     type: 'email',   status: 'active', budget: 150000, spent: 0,      currency: 'ARS', startDate: '2026-09-01', endDate: '2026-09-30' },
  { id: 6, name: 'Brand Awareness Q1',          client: 'BioSalud',    type: 'display', status: 'active', budget: 210000, spent: 111000, currency: 'ARS', startDate: '2026-08-15', endDate: '2026-10-15' },
  { id: 7, name: 'Black Friday 2025 - Display', client: 'SuenoSimple', type: 'display', status: 'closed', budget: 150000, spent: 148200, currency: 'ARS', startDate: '2025-11-01', endDate: '2025-11-30' },
  { id: 8, name: 'Hot Sale 2026',               client: 'SuenoSimple', type: 'display', status: 'draft',  budget: 80000,  spent: 0,      currency: 'ARS', startDate: '2026-10-15', endDate: '2026-10-31' },
]

// GET /api/budget/campaigns/summary
export const campaignsSummary = [
  { campaignId: 1, campaignName: 'Email Recupero de Carritos',  client: 'SuenoSimple', totalBudget: 30000,  spent: 12400,  remaining: 17600,  percentageUsed: 41.3 },
  { campaignId: 2, campaignName: 'Google Ads Conversión',       client: 'FinanzasYa',  totalBudget: 380000, spent: 345000, remaining: 35000,  percentageUsed: 90.8 },
  { campaignId: 3, campaignName: 'Search Black Friday',         client: 'TechStore',   totalBudget: 200000, spent: 215000, remaining: 0,      percentageUsed: 107.5 },
  { campaignId: 4, campaignName: 'Lanzamiento Colección Otoño', client: 'ModaExpress', totalBudget: 280000, spent: 182000, remaining: 98000,  percentageUsed: 65 },
  { campaignId: 5, campaignName: 'Reactivación Clientes VIP',   client: 'AutoSur',     totalBudget: 150000, spent: 0,      remaining: 150000, percentageUsed: 0 },
  { campaignId: 6, campaignName: 'Brand Awareness Q1',          client: 'BioSalud',    totalBudget: 210000, spent: 111000, remaining: 99000,  percentageUsed: 52.9 },
  { campaignId: 7, campaignName: 'Black Friday 2025 - Display', client: 'SuenoSimple', totalBudget: 150000, spent: 148200, remaining: 1800,   percentageUsed: 98.8 },
  { campaignId: 8, campaignName: 'Hot Sale 2026',               client: 'SuenoSimple', totalBudget: 80000,  spent: 0,      remaining: 80000,  percentageUsed: 0 },
]

// GET /api/crm/landings/summary
export const leadsSummary = [
  { id: 1, name: 'Email Recupero de Carritos - SuenoSimple',  client: 'SuenoSimple', status: 'active', leadCount: 285 },
  { id: 2, name: 'Google Ads Conversión - FinanzasYa',        client: 'FinanzasYa',  status: 'active', leadCount: 580 },
  { id: 3, name: 'Search Black Friday - TechStore',           client: 'TechStore',   status: 'active', leadCount: 412 },
  { id: 4, name: 'Lanzamiento Colección Otoño - ModaExpress', client: 'ModaExpress', status: 'active', leadCount: 320 },
  { id: 5, name: 'Reactivación Clientes VIP - AutoSur',       client: 'AutoSur',     status: 'active', leadCount: 0 },
  { id: 6, name: 'Brand Awareness Q1 - BioSalud',             client: 'BioSalud',    status: 'active', leadCount: 245 },
  { id: 7, name: 'Hot Sale 2026 - SuenoSimple',               client: 'SuenoSimple', status: 'draft',  leadCount: 0 },
]
