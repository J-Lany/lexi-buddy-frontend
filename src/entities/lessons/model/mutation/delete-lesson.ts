import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';

import { groupsKeys, studentsKeys } from '@/shared/query';
import { lessonsKeys } from '@/shared/query/lessons';

import { deleteLesson } from '../../api/delete-lesson';

export function useDeleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLesson,

    onSuccess: () => {
      const keys: QueryKey[] = [lessonsKeys.myList(), studentsKeys.all, groupsKeys.all];
      keys.forEach((queryKey) => {
        void queryClient.invalidateQueries({ queryKey });
      });
    },
  });
}
