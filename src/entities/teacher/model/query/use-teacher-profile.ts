import { useQuery } from '@tanstack/react-query';

import { getTeacherProfile } from '@/entities/teacher/api/get-teacher-profile';
import { teacherKeys } from '@/shared/query/teacher';

export function useTeacherProfileQuery() {
  return useQuery({
    queryKey: teacherKeys.profile(),
    queryFn: getTeacherProfile,
    staleTime: 5 * 60 * 1000,
  });
}
