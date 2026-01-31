import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout } from '@/features/auth/api/logout';
import type { HttpError } from '@/lib/api-client';
import { EAppRoutes } from '@/lib/routes';

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, HttpError, void>({
    mutationFn: logout,
    onSuccess: () => {
      void queryClient.removeQueries();
      window.location.href = EAppRoutes.LOGIN;
    },
  });

  return mutation;
}
