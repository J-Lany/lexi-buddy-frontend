import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { FormValues } from '@/features/auth/utils/types';

export function useSigninMutation() {
  return useMutation({
    mutationFn: async (payload: Partial<FormValues>) => {
      const { data } = await api.post('/auth/login', payload);
      return data;
    },
  });
}
