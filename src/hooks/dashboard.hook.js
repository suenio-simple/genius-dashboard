import { useCallback, useEffect, useState } from 'react'
import { getBudgetSummary, getCampaigns } from '../services/budgetManagerApi'
import { getLandings, getLeadsSummary } from '../services/landingCrmApi'

// Umbrales de las alertas de pacing y presupuesto
const NEAR_LIMIT_PERCENT = 90 // % consumido a partir del cual avisamos que se está por agotar
const PACING_MARGIN      = 25 // puntos de % consumido por encima del % de tiempo transcurrido

// Orden en el que se muestran las alertas, de más a menos urgente
const ALERT_PRIORITY = ['overBudget', 'nearLimit', 'pacing', 'noSpend']

const DAY_MS = 24 * 60 * 60 * 1000

const sumBy = (items, key) => items.reduce((sum, item) => sum + (item[key] ?? 0), 0)

// Las fechas vienen como 'YYYY-MM-DD'; se interpretan en hora local para que los días coincidan con el calendario
const parseDate = (date) => new Date(`${date}T00:00:00`).getTime()

function getPeriod(startDate, endDate, today) {
  const start     = parseDate(startDate)
  const end       = parseDate(endDate) + DAY_MS // el día de fin cuenta completo
  const totalDays = Math.round((end - start) / DAY_MS)

  if (today < start) return { timePercent: 0, totalDays, elapsedDays: 0, remainingDays: totalDays, phase: 'upcoming' }
  if (today >= end)  return { timePercent: 100, totalDays, elapsedDays: totalDays, remainingDays: 0, phase: 'finished' }

  const elapsedDays = Math.floor((today - start) / DAY_MS)
  return {
    timePercent: ((today - start) / (end - start)) * 100,
    totalDays,
    elapsedDays,
    remainingDays: totalDays - elapsedDays,
    phase: 'running',
  }
}

function getAlert({ spent, budget, percentageUsed }, timePercent) {
  if (spent > budget)                                return { type: 'overBudget', excess: spent - budget }
  if (percentageUsed >= NEAR_LIMIT_PERCENT)          return { type: 'nearLimit' }
  if (spent === 0 && timePercent > 0)                return { type: 'noSpend' }
  if (percentageUsed - timePercent >= PACING_MARGIN) return { type: 'pacing' }
  return null
}

// Calcula período y diagnóstico de cada campaña
function buildCampaignDetails(campaigns, today) {
  return campaigns.map((campaign) => {
    const percentageUsed = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0
    const period         = getPeriod(campaign.startDate, campaign.endDate, today)
    const detail         = { ...campaign, percentageUsed, available: campaign.budget - campaign.spent, period }

    return {
      ...detail,
      alert: campaign.status === 'active' ? getAlert(detail, period.timePercent) : null,
    }
  })
}

function buildAlerts(campaignDetails) {
  return campaignDetails
    .filter((c) => c.alert)
    .map((c) => ({
      campaignId: c.id,
      campaignName: c.name,
      client: c.client,
      totalBudget: c.budget,
      spent: c.spent,
      remaining: Math.max(c.available, 0),
      percentageUsed: c.percentageUsed,
      timePercent: c.period.timePercent,
      ...c.alert,
    }))
    .sort((a, b) => ALERT_PRIORITY.indexOf(a.type) - ALERT_PRIORITY.indexOf(b.type))
}

function buildBudgetData(campaigns, summary) {
  const campaignDetails = buildCampaignDetails(campaigns, Date.now())

  return {
    totalBudget: summary.totalBudget,
    totalSpent: summary.totalSpent,
    totalAvailable: summary.totalAvailable,
    spentPercent: summary.consumptionPercentage,
    activeCampaigns: summary.activeCampaigns,
    activeCampaignList: campaigns.filter((c) => c.status === 'active'),
    registeredCampaigns: campaigns.length,
    alerts: buildAlerts(campaignDetails),
    campaignDetailsById: new Map(campaignDetails.map((c) => [c.id, c])),
  }
}

// Orden en el que se listan las landings según su estado
const LANDING_STATUS_ORDER = ['active', 'paused', 'draft', 'closed']

const landingStatusRank = (status) => {
  const rank = LANDING_STATUS_ORDER.indexOf(status)
  return rank === -1 ? LANDING_STATUS_ORDER.length : rank
}

// GET /landings devuelve leadCount en 0: el conteo real se toma del resumen de leads
function buildCrmData(landings, leadsSummary) {
  const leadCountById = new Map(leadsSummary.map((l) => [l.id, l.leadCount]))

  return {
    totalLeads: sumBy(leadsSummary, 'leadCount'),
    activeLandings: landings.filter((l) => l.status === 'active').length,
    landingList: landings
      .map((l) => ({ ...l, leadCount: leadCountById.get(l.id) ?? 0 }))
      .sort((a, b) => landingStatusRank(a.status) - landingStatusRank(b.status)),
  }
}

const EMPTY_BUDGET = {
  totalBudget: null,
  totalSpent: null,
  totalAvailable: null,
  spentPercent: null,
  activeCampaigns: null,
  activeCampaignList: [],
  registeredCampaigns: null,
  alerts: [],
  campaignDetailsById: new Map(),
}

const EMPTY_CRM = { totalLeads: null, activeLandings: 0, landingList: [] }

// Cada API se resuelve por separado: si una se cae, sus métricas quedan en null y el resto se muestra igual
export function useDashboard() {
  const [state, setState] = useState({
    loading: true,
    budget: EMPTY_BUDGET,
    crm: EMPTY_CRM,
    budgetError: null,
    crmError: null,
    updatedAt: null,
  })
  const [reloadKey, setReloadKey] = useState(0)
  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  useEffect(() => {
    let cancelled = false
    setState((prev) => ({ ...prev, loading: true }))

    Promise.all([
      Promise.all([getCampaigns(), getBudgetSummary()]).then(
        ([campaigns, summary]) => ({ data: buildBudgetData(campaigns, summary), error: null }),
        (error) => ({ data: EMPTY_BUDGET, error }),
      ),
      Promise.all([getLandings(), getLeadsSummary()]).then(
        ([landings, leadsSummary]) => ({ data: buildCrmData(landings, leadsSummary), error: null }),
        (error) => ({ data: EMPTY_CRM, error }),
      ),
    ]).then(([budget, crm]) => {
      if (cancelled) return
      setState({
        loading: false,
        budget: budget.data,
        crm: crm.data,
        budgetError: budget.error,
        crmError: crm.error,
        updatedAt: new Date(),
      })
    })

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  return {
    currency: 'ARS',
    ...state.budget,
    ...state.crm,
    loading: state.loading,
    budgetError: state.budgetError,
    crmError: state.crmError,
    updatedAt: state.updatedAt,
    reload,
  }
}
