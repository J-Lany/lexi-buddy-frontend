import { useQuery } from '@tanstack/react-query';

import { getMyStudents } from '@/entities/students/api/get-my-students';
import { studentsKeys } from '@/shared/query';

export function useMyStudentsQuery(options?: { enabled?: boolean }) {
  return useQuery({
    enabled: options?.enabled ?? true,
    queryKey: studentsKeys.myList(),
    queryFn: getMyStudents,
  });
}
