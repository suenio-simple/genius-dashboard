import { useEffect, useState } from 'react';
import { getAlertaCritico } from '../dashboard.service';

export function useAlertaCritico() {
  const [alertaCritico, setAlertaCritico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getAlertaCritico()
      .then((data) => {
        if (!cancelled) setAlertaCritico(data);
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

  return { alertaCritico, loading, error };
}
