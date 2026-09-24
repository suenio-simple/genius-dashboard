import { useEffect, useState } from 'react'
import { leads } from '../mocks/dashboardSummary'

// TODO: reemplazar por getLandingLeads(landingId) de services/landingCrmApi al conectar la API
const fetchLandingLeads = async (landingId) => leads.filter((lead) => lead.landingId === landingId)

const IDLE = { status: 'idle', leads: [], error: null }

// Carga los leads de una landing; con landingId null no hace nada
export function useLandingLeads(landingId) {
  const [state, setState] = useState(IDLE)

  useEffect(() => {
    if (landingId == null) {
      setState(IDLE)
      return
    }

    let cancelled = false
    setState({ status: 'loading', leads: [], error: null })

    fetchLandingLeads(landingId)
      .then((result) => {
        if (cancelled) return
        const newestFirst = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        setState({ status: 'success', leads: newestFirst, error: null })
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', leads: [], error })
      })

    return () => {
      cancelled = true
    }
  }, [landingId])

  return state
}
