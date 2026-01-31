import { useMutation } from '@tanstack/react-query';

import {
  activateAccount,
  ActivationParams,
  ActivationResponse,
} from '@/features/auth/api/activate-account';
import type { HttpError } from '@/lib/api-client';

export function useActivateMutation() {
  return useMutation<ActivationResponse, HttpError, ActivationParams>({
    mutationFn: activateAccount,
    retry: false,
  });
}
