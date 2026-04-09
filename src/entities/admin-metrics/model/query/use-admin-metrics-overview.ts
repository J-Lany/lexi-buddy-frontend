import { useQuery } from '@tanstack/react-query';

import { getAdminMetricsOverview } from '../../api/get-admin-metrics-overview';

export function useAdminMetricsOverview(fromIso: string, toIso: string) {
  return useQuery({
    queryKey: ['admin-metrics', 'overview', fromIso, toIso],
    queryFn: () => getAdminMetricsOverview({ from: fromIso, to: toIso }),
    staleTime: 60_000,
  });
}
