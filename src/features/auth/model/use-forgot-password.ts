import { useMutation } from '@tanstack/react-query';

import {
  forgotPassword,
  ForgotPasswordParams,
  ForgotPasswordResponse,
} from '@/features/auth/api/forgot-password';
import { HttpError } from '@/shared/api';

export function useForgotPasswordMutation() {
  return useMutation<ForgotPasswordResponse, HttpError, ForgotPasswordParams>({
    mutationFn: forgotPassword,
    retry: false,
  });
}
