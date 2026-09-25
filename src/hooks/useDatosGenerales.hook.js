import { useEffect, useState } from 'react';
import { getDatosGenerales } from '../services/dashboard/dashboard.service';

export function useDatosGenerales() {
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getDatosGenerales()
      .then((data) => {
        if (!cancelled) setDatosGenerales(data);
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

  return { datosGenerales, loading, error };
}
