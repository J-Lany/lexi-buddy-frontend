import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addStudentToGroup } from '@/entities/groups/api/add-student-to-group';
import { groupsKeys } from '@/shared/query';

export function useAddStudentToGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addStudentToGroup,
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: groupsKeys.dashboard(variables.groupId) });
      void queryClient.invalidateQueries({ queryKey: groupsKeys.myList() });
    },
  });
}
