import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { GROUP_DASHBOARD_QUERY_KEY } from '@/lib/query-keys';

export function useAddStudent(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: number) => {
      const { data } = await api.post(`/groups/${groupId}/students`, null, {
        params: { studentId },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUP_DASHBOARD_QUERY_KEY, groupId] });
    },
  });
}
