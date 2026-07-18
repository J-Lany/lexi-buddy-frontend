import { useQuery } from '@tanstack/react-query';

import { getGroupDashboard } from '@/entities/groups/api/get-group-dashboard';
import { groupsKeys } from '@/shared/query';

export function useGroupDashboardQuery(groupId: number) {
  return useQuery({
    queryKey: groupsKeys.dashboard(groupId),
    queryFn: () => getGroupDashboard(groupId),
  });
}
