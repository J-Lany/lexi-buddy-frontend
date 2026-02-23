import { useQuery } from '@tanstack/react-query';

import {
  getLessonDashboard,
  LessonDashboardDto,
} from '@/entities/lessons/api/get-lesson-dashboard';
import { lessonsKeys } from '@/shared/query';

export function useLessonDashboardQuery(lessonId: number) {
  return useQuery<LessonDashboardDto>({
    queryKey: lessonsKeys.dashboard(lessonId),
    queryFn: () => getLessonDashboard(lessonId),
  });
}
