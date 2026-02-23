import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

import { assignLesson, AssignLessonPayload } from '@/entities/lessons/api/assign-lesson';
import { HttpError } from '@/shared/api';
import { groupsKeys, lessonsKeys, studentsKeys } from '@/shared/query';

export function useAssignLessonMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, HttpError, AssignLessonPayload>({
    mutationFn: assignLesson,
    onSuccess: (_data, { lessonId, studentIds, groupIds }) => {
      const keys: QueryKey[] = [
        lessonsKeys.dashboard(lessonId),
        lessonsKeys.myList(),
        ...(studentIds?.map((id) => studentsKeys.dashboard(id)) ?? []),
        ...(groupIds?.map((id) => groupsKeys.dashboard(id)) ?? []),
      ];

      keys.forEach((queryKey) => {
        void queryClient.invalidateQueries({ queryKey });
      });
    },
  });
}
