import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { EAppRoutes } from '@/lib/routes';

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/auth/logout');
      return data;
    },
    onSuccess: () => {
      queryClient.removeQueries();
      window.location.href = EAppRoutes.LOGIN;
    },
  });

  return mutation;
}
