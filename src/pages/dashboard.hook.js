import { useEffect, useState } from 'react';
import { mock } from './dashboard.service';

export function useDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDashboard(mock());
    setLoading(false);
  }, []);

  return { dashboard, loading };
}
