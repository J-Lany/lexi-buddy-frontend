import { useMutation } from '@tanstack/react-query';

import { register, RegisterParams } from '@/features/auth/api/register';
import type { HttpError } from '@/lib/api-client';

export function useSignupMutation() {
  return useMutation<void, HttpError, RegisterParams>({
    mutationFn: register,
  });
}
