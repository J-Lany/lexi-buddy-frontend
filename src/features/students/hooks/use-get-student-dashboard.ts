import { useQuery } from '@tanstack/react-query';
import { STUDENT_DASHBOARD_QUERY_KEY } from '@/features/students/utils/consts';
import { StudentDashboard } from '@/features/students/utils/types';
import { api } from '@/lib/api-client';

export function useGetStudentDashboard(studentId: string) {
  return useQuery({
    queryKey: [STUDENT_DASHBOARD_QUERY_KEY, studentId],
    enabled: Boolean(studentId),
    queryFn: async () => {
      const { data } = await api.get(`/students/${studentId}/dashboard`);
      return data as StudentDashboard;
    },
  });
}
