import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import {
  GROUP_DASHBOARD_QUERY_KEY,
  LESSON_DETAILS_QUERY_KEY,
  LESSONS_QUERY_KEY,
  STUDENT_DASHBOARD_QUERY_KEY,
} from '@/lib/query-keys';

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
    onSuccess: (_data, { lessonId, studentIds, groupIds }) => {
      queryClient.invalidateQueries({
        queryKey: [LESSON_DETAILS_QUERY_KEY, String(lessonId)],
      });

      queryClient.invalidateQueries({
        queryKey: [LESSONS_QUERY_KEY],
      });

      if (studentIds?.length) {
        studentIds.forEach((id) =>
          queryClient.invalidateQueries({
            queryKey: [STUDENT_DASHBOARD_QUERY_KEY, id],
          }),
        );
      } else {
        queryClient.invalidateQueries({
          queryKey: [STUDENT_DASHBOARD_QUERY_KEY],
        });
      }

      if (groupIds?.length) {
        groupIds.forEach((id) =>
          queryClient.invalidateQueries({
            queryKey: [GROUP_DASHBOARD_QUERY_KEY, id],
          }),
        );
      } else {
        queryClient.invalidateQueries({
          queryKey: [GROUP_DASHBOARD_QUERY_KEY],
        });
      }
    },
  });
}
