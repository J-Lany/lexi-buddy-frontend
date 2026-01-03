import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { STUDENTS_QUERY_KEY } from '@/lib/query-keys';

export type CreateTeacherRequestPayload = {
  studentId: number;
  message?: string;
};

export function useCreateTeacherRequestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTeacherRequestPayload) => {
      const { data } = await api.post('/teacher-requests', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STUDENTS_QUERY_KEY] });
    },
  });
}
