import type { QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createGroup } from '@/entities/groups/api/create-group';
import { groupsKeys, studentsKeys } from '@/shared/query';

export function useCreateGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,
    onSuccess: (_data, variables) => {
      const studentKeys = variables.studentIds.map((studentId) =>
        studentsKeys.dashboard(studentId),
      );
      const keys: QueryKey[] = [groupsKeys.myList(), ...studentKeys];

      keys.forEach((queryKey) => void queryClient.invalidateQueries({ queryKey }));
    },
  });
}
