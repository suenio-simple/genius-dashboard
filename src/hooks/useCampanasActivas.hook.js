import { useEffect, useState } from 'react';
import { getCampanasActivas } from '../services/dashboard/dashboard.service';

export function useCampanasActivas() {
  const [campanasActivas, setCampanasActivas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getCampanasActivas()
      .then((data) => {
        if (!cancelled) setCampanasActivas(data);
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

  return { campanasActivas, loading, error };
}
