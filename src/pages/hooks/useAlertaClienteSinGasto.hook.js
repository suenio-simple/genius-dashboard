import { useEffect, useState } from 'react';
import { getAlertaClienteSinGasto } from '../dashboard.service';

export function useAlertaClienteSinGasto() {
  const [alertaClienteSinGasto, setAlertaClienteSinGasto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getAlertaClienteSinGasto()
      .then((data) => {
        if (!cancelled) setAlertaClienteSinGasto(data);
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

  return { alertaClienteSinGasto, loading, error };
}
