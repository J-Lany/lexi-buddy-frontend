import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { GROUPS_QUERY_KEY } from '@/lib/query-keys';

export function useGetGroups() {
  return useQuery({
    queryKey: [GROUPS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get('/groups/my');

      return data;
    },
  });
}
