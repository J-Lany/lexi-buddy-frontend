import { useQuery } from '@tanstack/react-query';
import { GROUP_DASHBOARD_QUERY_KEY } from '@/features/students/utils/consts';
import { api } from '@/lib/api-client';
import { GroupDashboard } from '@/features/groups/utils/types';

export function useGetGroupDashboard(groupId: string) {
  return useQuery<GroupDashboard>({
    queryKey: [GROUP_DASHBOARD_QUERY_KEY, groupId],
    enabled: Boolean(groupId),
    queryFn: async () => {
      const { data } = await api.get<GroupDashboard>(`/groups/${groupId}/dashboard`);
      return data;
    },
  });
}
