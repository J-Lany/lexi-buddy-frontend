import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { EAgeGroup, ELevel } from '@/lib/enums';

export type TranslateReqPayload = {
  level: ELevel;
  topic: string;
  ageGroup: EAgeGroup;
  terms: string[];
};

export function useTranslateMutation() {
  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: async (payload: TranslateReqPayload) => {
      const response = await api.post('/lessons/vocab/preview', payload);
      return response.data;
    },
  });

  return {
    mutate,
    isPending,
    isError,
    error,
    data,
  };
}
