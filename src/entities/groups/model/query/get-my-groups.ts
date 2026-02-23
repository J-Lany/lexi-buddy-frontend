import { useQuery } from '@tanstack/react-query';

import { getMyGroups } from '@/entities/groups/api/get-my-groups';
import { groupsKeys } from '@/shared/query';

export function useMyGroupsQuery(options?: { enabled?: boolean }) {
  return useQuery({
    enabled: options?.enabled ?? true,
    queryKey: groupsKeys.myList(),
    queryFn: getMyGroups,
  });
}
