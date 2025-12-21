import { useQuery } from '@tanstack/react-query';
import { GROUPS_QUERY_KEY, STUDENTS_QUERY_KEY } from '@/features/students/utils/consts';
import { api } from '@/lib/api-client';

export function useGetGroups() {
  return useQuery({
    queryKey: [GROUPS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get('/groups/my');

      return data;
    },
  });
}
