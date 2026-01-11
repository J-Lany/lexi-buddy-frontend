import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { STUDENT_DASHBOARD_QUERY_KEY, STUDENTS_QUERY_KEY } from '@/lib/query-keys';
import { EAgeGroup, ELevel } from '@/lib/enums';

export type UpdateStudentProfilePayload = {
  studentId: number;

  firstName?: string;
  lastName?: string;
  level?: ELevel | null;
  ageGroup?: EAgeGroup | null;
};

export function useUpdateStudentProfile(studentId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateStudentProfilePayload) => {
      const { studentId, ...body } = payload;

      const cleanBody = Object.fromEntries(Object.entries(body).filter(([, v]) => v !== undefined));

      const { data } = await api.patch(`/students/${studentId}`, cleanBody);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });

      if (studentId) {
        queryClient.invalidateQueries({
          queryKey: [STUDENT_DASHBOARD_QUERY_KEY, String(studentId)],
        });
      }
    },
  });
}
