import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { STUDENTS_QUERY_KEY } from '@/lib/query-keys';

export function useGetStudents() {
  return useQuery({
    queryKey: [STUDENTS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get('/students/my');

      return data;
    },
  });
}
