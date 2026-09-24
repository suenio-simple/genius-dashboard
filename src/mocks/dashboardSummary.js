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

// GET /api/crm/landings
export const landings = [
  landing(1, 1, 'Hot Sale 2026 - SuenoSimple', 'SuenoSimple', 'active', 0, '2026-04-01T10:00:00.000Z', {
    title: 'Hot Sale 2026', subtitle: 'Hasta 50% off en colchones', ctaText: 'Ver ofertas',
    ctaUrl: 'https://suenosimple.com/hot-sale', eventDate: '2026-05-20',
  }),
  landing(2, 2, 'Email Recupero de Carritos - SuenoSimple', 'SuenoSimple', 'active', 285, '2026-07-25T10:00:00.000Z', {
    title: 'Tu carrito te espera', subtitle: 'Terminá tu compra con envío gratis', ctaText: 'Volver al carrito',
    ctaUrl: 'https://suenosimple.com/carrito', eventDate: '2026-08-01',
  }),
  landing(3, 1, 'Google Ads Conversión - FinanzasYa', 'FinanzasYa', 'active', 580, '2026-08-25T10:00:00.000Z', {
    title: 'Tu préstamo en 24 hs', subtitle: 'Simulá tu cuota sin compromiso', ctaText: 'Simular préstamo',
    ctaUrl: 'https://finanzasya.com/prestamos', eventDate: '2026-09-01',
  }),
  landing(4, 1, 'Search Black Friday - TechStore', 'TechStore', 'active', 412, '2026-09-05T10:00:00.000Z', {
    title: 'Black Friday TechStore', subtitle: 'Notebooks y celulares con hasta 40% off', ctaText: 'Ver ofertas',
    ctaUrl: 'https://techstore.com/black-friday', eventDate: '2026-09-10',
  }),
  landing(5, 3, 'Lanzamiento Colección Otoño - ModaExpress', 'ModaExpress', 'active', 320, '2026-09-10T10:00:00.000Z', {
    title: 'Nueva colección otoño', subtitle: 'Descubrí las tendencias de la temporada', ctaText: 'Ver colección',
    ctaUrl: 'https://modaexpress.com/otono', eventDate: '2026-09-18',
  }),
  landing(6, 2, 'Reactivación Clientes VIP - AutoSur', 'AutoSur', 'active', 0, '2026-08-28T10:00:00.000Z', {
    title: 'Beneficios exclusivos VIP', subtitle: 'Service con 30% off para clientes VIP', ctaText: 'Reservar turno',
    ctaUrl: 'https://autosur.com/vip', eventDate: '2026-09-01',
  }),
  landing(7, 3, 'Brand Awareness Q1 - BioSalud', 'BioSalud', 'active', 245, '2026-08-10T10:00:00.000Z', {
    title: 'Cuidate con BioSalud', subtitle: 'Planes de salud para toda la familia', ctaText: 'Conocer planes',
    ctaUrl: 'https://biosalud.com/planes', eventDate: '2026-08-15',
  }),
  landing(8, 1, 'Black Friday 2025 - SuenoSimple', 'SuenoSimple', 'inactive', 0, '2025-10-20T10:00:00.000Z', {
    title: 'Black Friday 2025', subtitle: 'Colchones con hasta 60% off', ctaText: 'Ver ofertas',
    ctaUrl: 'https://suenosimple.com/black-friday', eventDate: '2025-11-01',
  }),
]

function landing(id, templateId, name, client, status, leadCount, createdAt, fields) {
  return {
    id,
    templateId,
    name,
    client,
    status,
    fields: { ...fields, heroImageUrl: 'https://via.placeholder.com/1200x400' },
    createdAt,
    leadCount,
  }
}

// GET /api/crm/landings/summary (se arma desde landings para que ambos mocks coincidan)
export const leadsSummary = landings.map(({ id, name, client, status, leadCount }) => ({ id, name, client, status, leadCount }))

// GET /api/crm/landings/{id}/leads — se generan tantos leads como indica leadCount de cada landing
const FIRST_NAMES = ['María', 'Juan', 'Laura', 'Carlos', 'Sofía', 'Martín', 'Lucía', 'Diego', 'Valentina', 'Pablo']
const LAST_NAMES  = ['Gómez', 'Pérez', 'Martínez', 'Fernández', 'López', 'Díaz', 'Romero', 'Sosa', 'Álvarez', 'Torres']
const MESSAGES    = [null, 'Quiero más información', null, '¿Tienen financiación en cuotas?', null, '¿Hacen envíos al interior?']
const HOUR_MS     = 60 * 60 * 1000

const toEmailSlug = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

let nextLeadId = 1

export const leads = landings.flatMap((l) =>
  Array.from({ length: l.leadCount }, (_, i) => {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length]
    const lastName  = LAST_NAMES[(i * 3 + l.id) % LAST_NAMES.length]

    return {
      id: nextLeadId++,
      landingId: l.id,
      name: `${firstName} ${lastName}`,
      email: `${toEmailSlug(firstName)}.${toEmailSlug(lastName)}${i}@gmail.com`,
      phone: i % 2 === 0 ? `11${String(40000000 + i * 7919).slice(0, 8)}` : null,
      message: MESSAGES[i % MESSAGES.length],
      createdAt: new Date(new Date(l.createdAt).getTime() + (i + 1) * 3 * HOUR_MS).toISOString(),
    }
  })
)
