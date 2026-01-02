import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { LESSON_DETAILS_QUERY_KEY } from '@/lib/query-keys';

export function useGetLessonDetails(lessonId: string) {
  return useQuery<LessonDetails>({
    queryKey: [LESSON_DETAILS_QUERY_KEY, lessonId],
    enabled: Boolean(lessonId),
    queryFn: async () => {
      const { data } = await api.get(`/lessons/${lessonId}`);
      return data as LessonDetails;
    },
  });
}
