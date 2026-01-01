import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { LESSON_DETAILS_QUERY_KEY, LESSONS_QUERY_KEY } from '@/features/students/utils/consts';

type AssignLessonInput = {
  lessonId: number;
  studentIds?: number[];
  groupIds?: number[];
};

type AssignLessonResponse = {
  created: number;
};

export function useAssignLesson() {
  const queryClient = useQueryClient();

  return useMutation<AssignLessonResponse, unknown, AssignLessonInput>({
    mutationFn: async ({ lessonId, studentIds, groupIds }) => {
      const { data } = await api.post(`/lessons/${lessonId}/assign`, {
        studentIds,
        groupIds,
      });

      return data as AssignLessonResponse;
    },
    onSuccess: (_data, { lessonId }) => {
      queryClient.invalidateQueries({
        queryKey: [LESSON_DETAILS_QUERY_KEY, String(lessonId)],
      });
      queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY],
      });
    },
  });
}
