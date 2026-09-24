import { useMemo } from 'react'
import { campaigns, campaignsSummary, leadsSummary } from '../mocks/dashboardSummary'

const sumBy = (items, key) => items.reduce((sum, item) => sum + (item[key] ?? 0), 0)

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
    }
  }, [])
}
