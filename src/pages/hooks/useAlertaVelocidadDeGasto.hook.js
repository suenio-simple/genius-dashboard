import { useEffect, useState } from 'react';
import { getAlertaVelocidadDeGasto } from '../dashboard.service';

export function useAlertaVelocidadDeGasto() {
  const [alertaVelocidadDeGasto, setAlertaVelocidadDeGasto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getAlertaVelocidadDeGasto()
      .then((data) => {
        if (!cancelled) setAlertaVelocidadDeGasto(data);
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

  return { alertaVelocidadDeGasto, loading, error };
}
