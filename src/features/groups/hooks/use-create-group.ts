import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { GROUPS_QUERY_KEY } from '@/features/students/utils/consts';

export type CreateGroupPayload = {
  name: string;
  level: string;
  description?: string;
  studentIds: number[];
};

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateGroupPayload) => {
      const { data } = await api.post('/groups/my', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
    },
  });
}
