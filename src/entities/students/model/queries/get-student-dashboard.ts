import { useQuery } from '@tanstack/react-query';

import {
  getStudentDashboard,
  StudentDashboardDto,
} from '@/entities/students/api/get-student-dashboard';
import { HttpError } from '@/shared/api';
import { studentsKeys } from '@/shared/query';

export function useStudentDashboardQuery(studentId?: number) {
  const enabled = studentId !== undefined;
  const queryKey = enabled ? studentsKeys.dashboard(studentId) : studentsKeys.all;

  return useQuery<StudentDashboardDto, HttpError>({
    queryKey,
    enabled,
    queryFn: () => getStudentDashboard(studentId!),
  });
}
