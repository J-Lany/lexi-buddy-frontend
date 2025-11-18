import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export function useActivateMutation() {
  return useMutation({
    mutationFn: async (token: string) => {
      const { data } = await api.get('/auth/activate', {
        params: { token },
      });
      return data;
    },
  });
}
