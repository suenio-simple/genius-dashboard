import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Campaigns from './Campaigns'

vi.mock('../services/budgetManagerApi', () => ({
  getCampaigns: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        name: 'Campaña prueba',
        client: 'SueñoSimple',
        type: 'display',
        status: 'active',
        budget: 1000,
      },
    ])
  ),

  updateCampaignStatus: vi.fn(() =>
    Promise.resolve({
      status: 'paused',
    })
  ),
}))

import {
  updateCampaignStatus,
} from '../services/budgetManagerApi'

describe('Campaigns - cambio de estado', () => {
  it('actualiza el estado de una campaña', async () => {
    render(<Campaigns />)

    const select = await screen.findByDisplayValue('active')

    fireEvent.change(select, {
      target: {
        value: 'paused',
      },
    })

    await waitFor(() => {
      expect(updateCampaignStatus).toHaveBeenCalledWith(
        1,
        'paused'
      )
    })
  })
})