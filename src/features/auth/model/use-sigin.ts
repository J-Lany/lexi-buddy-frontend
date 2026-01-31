import { useMutation } from '@tanstack/react-query';

import { login, LoginParams, LoginResponse } from '@/features/auth/api/login';
import type { HttpError } from '@/lib/api-client';

export function useSignInMutation() {
  return useMutation<LoginResponse, HttpError, LoginParams>({
    mutationFn: login,
    retry: false,
  });
}
