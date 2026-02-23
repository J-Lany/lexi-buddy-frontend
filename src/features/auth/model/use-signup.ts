import { useMutation } from '@tanstack/react-query';

import { register, RegisterParams } from '@/features/auth/api/register';
import { HttpError } from '@/shared/api';

export function useSignupMutation() {
  return useMutation<void, HttpError, RegisterParams>({
    mutationFn: register,
  });
}
