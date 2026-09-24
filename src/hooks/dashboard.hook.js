import { useMemo } from 'react'
import { campaigns, campaignsSummary, leadsSummary } from '../mocks/dashboardSummary'

// Umbrales de las alertas de pacing y presupuesto
const NEAR_LIMIT_PERCENT = 90 // % consumido a partir del cual avisamos que se está por agotar
const PACING_MARGIN      = 25 // puntos de % consumido por encima del % de tiempo transcurrido

// Orden en el que se muestran las alertas, de más a menos urgente
const ALERT_PRIORITY = ['overBudget', 'nearLimit', 'pacing', 'noSpend']

const DAY_MS = 24 * 60 * 60 * 1000

const sumBy = (items, key) => items.reduce((sum, item) => sum + (item[key] ?? 0), 0)

function elapsedPercent(startDate, endDate, today) {
  const start = new Date(startDate).getTime()
  const end   = new Date(endDate).getTime() + DAY_MS // el día de fin cuenta completo
  if (today < start) return 0
  if (today >= end)  return 100
  return ((today - start) / (end - start)) * 100
}

function getAlert(summary, campaign, today) {
  const { spent, totalBudget, percentageUsed } = summary
  const timePercent = elapsedPercent(campaign.startDate, campaign.endDate, today)

  if (spent > totalBudget)                           return { type: 'overBudget', excess: spent - totalBudget }
  if (percentageUsed >= NEAR_LIMIT_PERCENT)          return { type: 'nearLimit' }
  if (spent === 0 && timePercent > 0)                return { type: 'noSpend' }
  if (percentageUsed - timePercent >= PACING_MARGIN) return { type: 'pacing', timePercent }
  return null
}

function buildAlerts(today) {
  const campaignsById = new Map(campaigns.map((c) => [c.id, c]))

  return campaignsSummary
    .map((summary) => {
      const campaign = campaignsById.get(summary.campaignId)
      if (campaign?.status !== 'active') 
        return null

      const alert = getAlert(summary, campaign, today)
      return alert && { ...summary, ...alert }
    })
    .filter(Boolean)
    .sort((a, b) => ALERT_PRIORITY.indexOf(a.type) - ALERT_PRIORITY.indexOf(b.type))
}

export function useDashboard() {
  return useMemo(() => {
    const totalBudget         = sumBy(campaignsSummary, 'totalBudget')
    const totalSpent          = sumBy(campaignsSummary, 'spent')
    const totalAvailable      = sumBy(campaignsSummary, 'remaining')
    const activeCampaigns     = campaigns.filter((c) => c.status === 'active').length
    const registeredCampaigns = campaigns.length
    const totalLeads          = sumBy(leadsSummary, 'leadCount')

    return {
      currency: 'ARS',
      totalBudget,
      totalSpent,
      totalAvailable,
      spentPercent: totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0,
      activeCampaigns,
      registeredCampaigns,
      totalLeads,
      alerts: buildAlerts(Date.now()),
    }
  }, [])
}
