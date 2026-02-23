import { useMutation } from '@tanstack/react-query';

import {
  activateAccount,
  ActivationParams,
  ActivationResponse,
} from '@/features/auth/api/activate-account';
import { HttpError } from '@/shared/api';

export function useActivateMutation() {
  return useMutation<ActivationResponse, HttpError, ActivationParams>({
    mutationFn: activateAccount,
    retry: false,
  });
}
