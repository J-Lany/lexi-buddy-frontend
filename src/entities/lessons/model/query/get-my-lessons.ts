import { useQuery } from '@tanstack/react-query';

import { getMyLessons, LessonSummaryDto } from '@/entities/lessons/api/get-my-lessons';
import { lessonsKeys } from '@/shared/query';

export function useMyLessonsQuery() {
  return useQuery<LessonSummaryDto[]>({
    queryKey: lessonsKeys.myList(),
    queryFn: getMyLessons,
  });
}
