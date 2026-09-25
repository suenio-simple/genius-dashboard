import { useEffect, useState } from 'react';
import { getAlertaAdvertencia } from '../services/dashboard/dashboard.service';

export function useAlertaAdvertencia() {
  const [alertaAdvertencia, setAlertaAdvertencia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getAlertaAdvertencia()
      .then((data) => {
        if (!cancelled) setAlertaAdvertencia(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { alertaAdvertencia, loading, error };
}
