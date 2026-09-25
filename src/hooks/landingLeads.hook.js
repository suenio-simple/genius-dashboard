import { useEffect, useState } from 'react'
import { getLandingLeads } from '../services/landingCrmApi'

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

    getLandingLeads(landingId)
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
