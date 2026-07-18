import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { TeacherProfileDto } from '@/entities/teacher/api/get-teacher-profile';
import {
  updateTeacherProfile,
  UpdateTeacherProfilePayload,
} from '@/entities/teacher/api/update-teacher-profile';
import { HttpError } from '@/shared/api';
import { teacherKeys } from '@/shared/query/teacher';

export function useUpdateTeacherProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation<TeacherProfileDto, HttpError, UpdateTeacherProfilePayload>({
    mutationFn: updateTeacherProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(teacherKeys.profile(), data);
    },
  });
}
