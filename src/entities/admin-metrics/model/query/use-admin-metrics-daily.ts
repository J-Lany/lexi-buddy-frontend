import { useQuery } from '@tanstack/react-query';

import { getAdminMetricsDaily } from '../../api/get-admin-metrics-daily';

export function useAdminMetricsDaily(days: number) {
  return useQuery({
    queryKey: ['admin-metrics', 'daily', days],
    queryFn: () => getAdminMetricsDaily({ days }),
    staleTime: 5 * 60_000,
  });
}
