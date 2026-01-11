import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { GROUP_DASHBOARD_QUERY_KEY } from '@/lib/query-keys';

export function useRemoveStudent(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentId: number) => {
      const { data } = await api.delete(`/groups/${groupId}/students/${studentId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUP_DASHBOARD_QUERY_KEY, groupId] });
    },
  });
}
