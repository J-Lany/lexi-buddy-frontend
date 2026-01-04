import { api } from '@/lib/api-client';
import { LESSONS_QUERY_KEY } from '@/lib/query-keys';
import { VocabItem } from '@/features/lessons/create-lesson-modal/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EAgeGroup, ELevel } from '@/lib/enums';
import { TAssignment } from '@/lib/types';

export type CreateLessonPayload = {
  title: string;
  level?: ELevel;
  ageCategory?: EAgeGroup;
  topic?: string;
  description?: string;
  vocabItems?: VocabItem[];
  assignments?: Partial<TAssignment>[];
};

export function useCreateLesson() {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: async (payload: CreateLessonPayload) => {
      const response = await api.post('/lessons', payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LESSONS_QUERY_KEY] });
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
