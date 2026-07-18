import { useMutation } from '@tanstack/react-query';

import {
  confirmPasswordChange,
  ConfirmPasswordChangeParams,
  ConfirmPasswordChangeResponse,
} from '@/features/auth/api/confirm-password-change';
import { HttpError } from '@/shared/api';

export function useConfirmPasswordChangeMutation() {
  return useMutation<ConfirmPasswordChangeResponse, HttpError, ConfirmPasswordChangeParams>({
    mutationFn: confirmPasswordChange,
    retry: false,
  });
}
