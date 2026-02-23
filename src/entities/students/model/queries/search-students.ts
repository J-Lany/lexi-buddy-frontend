import { useQuery } from '@tanstack/react-query';

import { searchStudents } from '@/entities/students/api/search-students';
import { studentsKeys } from '@/shared/query';

export function useSearchStudentsQuery(q: string) {
  const query = (q ?? '').trim().replace(/^@+/, '');

  return useQuery({
    queryKey: studentsKeys.search(q),
    enabled: query.length >= 2,
    queryFn: () => searchStudents(query),
    staleTime: 10_000,
  });
}
