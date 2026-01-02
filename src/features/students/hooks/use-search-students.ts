import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { STUDENTS_SEARCH_QUERY_KEY } from '@/lib/query-keys';

export type StudentSearchItem = {
  id: number;
  username: string | null;
  name: string;
  level: string | null;
};

export function useSearchStudents(q: string) {
  const query = (q ?? '').trim().replace(/^@+/, '');

  return useQuery({
    queryKey: [STUDENTS_SEARCH_QUERY_KEY, query],
    enabled: query.length >= 2,
    queryFn: async () => {
      const { data } = await api.get(`/students/search`, {
        params: { q: query },
      });
      return data as StudentSearchItem[];
    },
    staleTime: 10_000,
  });
}
