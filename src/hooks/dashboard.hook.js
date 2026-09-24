import { useMemo } from 'react'
import { campaigns, campaignsSummary, landings, leadsSummary } from '../mocks/dashboardSummary'

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

// Une el listado de campañas con su resumen de presupuesto y calcula período y diagnóstico
function buildCampaignDetails(today) {
  const summaryById = new Map(campaignsSummary.map((s) => [s.campaignId, s]))

  return campaigns.map((campaign) => {
    const summary        = summaryById.get(campaign.id)
    const percentageUsed = summary?.percentageUsed ?? (campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0)
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

export function useDashboard() {
  return useMemo(() => {
    const totalBudget         = sumBy(campaignsSummary, 'totalBudget')
    const totalSpent          = sumBy(campaignsSummary, 'spent')
    const totalAvailable      = totalBudget - totalSpent
    const activeCampaignList  = campaigns.filter((c) => c.status === 'active')
    const registeredCampaigns = campaigns.length
    const totalLeads          = sumBy(leadsSummary, 'leadCount')
    const campaignDetails     = buildCampaignDetails(Date.now())

    return {
      currency: 'ARS',
      totalBudget,
      totalSpent,
      totalAvailable,
      spentPercent: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
      activeCampaigns: activeCampaignList.length,
      activeCampaignList,
      activeLandingList: landings.filter((l) => l.status === 'active'),
      registeredCampaigns,
      totalLeads,
      alerts: buildAlerts(campaignDetails),
      campaignDetailsById: new Map(campaignDetails.map((c) => [c.id, c])),
    }
  }, [])
}
