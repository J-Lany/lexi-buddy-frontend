import { useMutation } from '@tanstack/react-query';

import {
  requestPasswordChange,
  RequestPasswordChangeParams,
  RequestPasswordChangeResponse,
} from '@/features/auth/api/request-password-change';
import { HttpError } from '@/shared/api';

export function useRequestPasswordChangeMutation() {
  return useMutation<RequestPasswordChangeResponse, HttpError, RequestPasswordChangeParams>({
    mutationFn: requestPasswordChange,
    retry: false,
  });
}
