import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { EAgeGroup, EAssigmentType, ELevel } from '@/lib/enums';

export type CreateAssugmentPayload = {
  level: ELevel;
  topic: string;
  ageGroup: EAgeGroup;
  terms: string[];
  questionsCount: number;
  type: EAssigmentType;
};
export function useCreateAssigments() {
  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: async (payload: CreateAssugmentPayload) => {
      const response = await api.post('/lessons/assignments/preview', payload);
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
