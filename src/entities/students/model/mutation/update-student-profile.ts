import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateStudentProfile } from '@/entities/students/api/update-student-profile';
import { studentsKeys } from '@/shared/query';

export function useUpdateStudentProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: studentsKeys.dashboard(variables.studentId) });
      void queryClient.invalidateQueries({ queryKey: studentsKeys.myList() });
    },
  });
}
