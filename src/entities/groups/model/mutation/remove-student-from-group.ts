import type { QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeStudentFromGroup } from '@/entities/groups/api/remove-student-from-group';
import { groupsKeys, studentsKeys } from '@/shared/query';

export function useRemoveStudentFromGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeStudentFromGroup,
    onSuccess: (_data, variables) => {
      const keys: QueryKey[] = [
        groupsKeys.myList(),
        groupsKeys.dashboard(variables.groupId),
        studentsKeys.dashboard(variables.studentId),
      ];

      keys.forEach((queryKey) => void queryClient.invalidateQueries({ queryKey }));
    },
  });
}
