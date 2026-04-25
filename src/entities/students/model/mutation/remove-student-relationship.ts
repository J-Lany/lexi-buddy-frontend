import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  removeStudentRelationship,
  RemoveStudentRelationshipParams,
  RemoveStudentRelationshipResponse,
} from '@/entities/students/api/remove-student-relationship';
import { HttpError } from '@/shared/api';
import { groupsKeys, lessonsKeys, studentsKeys } from '@/shared/query';

export function useRemoveStudentRelationshipMutation() {
  const queryClient = useQueryClient();

  return useMutation<RemoveStudentRelationshipResponse, HttpError, RemoveStudentRelationshipParams>(
    {
      mutationFn: removeStudentRelationship,
      onSuccess: (_data, variables) => {
        void queryClient.invalidateQueries({ queryKey: studentsKeys.all });
        void queryClient.invalidateQueries({ queryKey: groupsKeys.all });
        void queryClient.invalidateQueries({ queryKey: lessonsKeys.all });

        void queryClient.removeQueries({
          queryKey: studentsKeys.dashboard(variables.studentId),
          exact: true,
        });
      },
    },
  );
}
