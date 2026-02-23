import { useMutation, useQueryClient } from '@tanstack/react-query';

import { inviteStudent } from '@/entities/students/api/invite-student';
import { studentsKeys } from '@/shared/query';

export function useInviteStudentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inviteStudent,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: studentsKeys.myList() });
    },
  });
}
