import { render, screen, waitFor, within } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Dashboard from '../Dashboard'

import * as budgetApi from '../../services/budgetManagerApi'
import * as crmApi from '../../services/landingCrmApi'

vi.mock('../../services/budgetManagerApi')
vi.mock('../../services/landingCrmApi')

describe('Dashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra los KPIs obtenidos desde los backends', async () => {
    budgetApi.getBudgetSummary.mockResolvedValue({
      activeCampaigns: 3,
      totalBudget: 350000,
      totalSpent: 275800,
      totalAvailable: 74200,
      consumptionPercentage: 78.8
    })

    crmApi.getLeadsSummary.mockResolvedValue([
      {
        id: 1,
        name: 'Hot Sale 2026',
        leadCount: 0
      },
      {
        id: 2,
        name: 'Newsletter',
        leadCount: 3
      }
    ])

    render(<Dashboard />)

    expect(screen.getByText('Cargando...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Campañas activas')).toBeInTheDocument()
    })

    const campaniasCard = screen
      .getByText('Campañas activas')
      .closest('.kpi-card')

    const leadsCard = screen
      .getByText('Total leads')
      .closest('.kpi-card')

    expect(
      within(campaniasCard).getByText('3')
    ).toBeInTheDocument()

    expect(
      within(leadsCard).getByText('3')
    ).toBeInTheDocument()

    expect(
      screen.getByText('$350.000')
    ).toBeInTheDocument()

    expect(
      screen.getByText('$275.800')
    ).toBeInTheDocument()
  })

  it('suma correctamente los leads de todas las landings', async () => {
    budgetApi.getBudgetSummary.mockResolvedValue({
      activeCampaigns: 3,
      totalBudget: 350000,
      totalSpent: 275800,
      totalAvailable: 74200,
      consumptionPercentage: 78.8
    })

    crmApi.getLeadsSummary.mockResolvedValue([
      {
        id: 1,
        leadCount: 2
      },
      {
        id: 2,
        leadCount: 5
      },
      {
        id: 3,
        leadCount: 3
      }
    ])

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('Total leads')).toBeInTheDocument()
    })

    const leadsCard = screen
      .getByText('Total leads')
      .closest('.kpi-card')

    expect(
      within(leadsCard).getByText('10')
    ).toBeInTheDocument()
  })

  it('muestra error si falla una API', async () => {
    budgetApi.getBudgetSummary.mockRejectedValue(
      new Error('Error al obtener presupuesto')
    )

    crmApi.getLeadsSummary.mockResolvedValue([])

    render(<Dashboard />)

    await waitFor(() => {
      expect(
        screen.getByText(/Error al conectar con las APIs/i)
      ).toBeInTheDocument()
    })
  })
})