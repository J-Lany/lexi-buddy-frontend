import { LessonSummaryDto } from '@/entities/lessons/api/get-my-lessons';

function normalize(q: string): string {
  return q.trim().toLowerCase();
}

export function filterLessonsByQuery(lessons: LessonSummaryDto[], q: string): LessonSummaryDto[] {
  const nq = normalize(q);
  if (!nq) return lessons;

  return lessons.filter((lesson) => {
    const title = lesson.title.toLowerCase();
    const topic = lesson.topic?.toLowerCase() ?? '';
    return title.includes(nq) || topic.includes(nq);
  });
}
