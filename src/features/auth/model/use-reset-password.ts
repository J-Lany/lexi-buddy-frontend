import { useMutation } from '@tanstack/react-query';

import {
  resetPassword,
  ResetPasswordParams,
  ResetPasswordResponse,
} from '@/features/auth/api/reset-password';
import { HttpError } from '@/shared/api';

export function useResetPasswordMutation() {
  return useMutation<ResetPasswordResponse, HttpError, ResetPasswordParams>({
    mutationFn: resetPassword,
    retry: false,
  });
}
