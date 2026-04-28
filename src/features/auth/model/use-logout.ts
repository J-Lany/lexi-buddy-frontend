import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout } from '@/features/auth/api/logout';
import { HttpError } from '@/shared/api';
import { routes } from '@/shared/router/routes';

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  return useMutation<void, HttpError, void>({
    mutationFn: logout,
    onSuccess: () => {
      void queryClient.removeQueries();
      window.location.href = routes.main;
    },
    onError: () => {
      void queryClient.removeQueries();
      window.location.href = routes.main;
    },
  });
}
