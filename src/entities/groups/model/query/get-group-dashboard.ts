import { useQuery } from '@tanstack/react-query';

import { getGroupDashboard } from '@/entities/groups/api/get-group-dashboard';
import { groupsKeys } from '@/shared/query';

export function useGroupDashboardQuery(groupId?: number) {
  const enabled = groupId !== undefined;
  const queryKey = enabled ? groupsKeys.dashboard(groupId) : groupsKeys.all;

  return useQuery({
    queryKey,
    enabled,
    queryFn: () => getGroupDashboard(groupId!),
  });
}
