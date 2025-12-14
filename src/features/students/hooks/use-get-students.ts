import { useQuery } from '@tanstack/react-query';
import { STUDENTS_QUERY_KEY } from '@/features/students/utils/consts';
import { api } from '@/lib/api-client';

export function useGetStudents() {
  return useQuery({
    queryKey: [STUDENTS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get('/students/my');

      return data;
    },
  });
}
