import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createLesson,
  CreateLessonPayload,
  CreateLessonResponseDto,
} from '@/entities/lessons/api/create-lesson';
import type { HttpError } from '@/shared/api';
import { lessonsKeys } from '@/shared/query';

export function useCreateLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreateLessonResponseDto, HttpError, CreateLessonPayload>({
    mutationFn: createLesson,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: lessonsKeys.myList() });
    },
  });
}
