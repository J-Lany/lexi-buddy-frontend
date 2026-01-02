import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { LessonSummary } from '@/features/lessons/create-lesson-modal/types';
import { LESSONS_QUERY_KEY } from '@/lib/query-keys';

export function useGetLessons() {
  return useQuery<LessonSummary[]>({
    queryKey: [LESSONS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get('/lessons');
      return data as LessonSummary[];
    },
  });
}
