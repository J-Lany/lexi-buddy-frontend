import { GroupLesson } from '@/entities/groups/api/get-group-dashboard';

export function calcAvgCompletion(lessons: readonly GroupLesson[]) {
  const total = lessons.length;
  if (!total) return 0;

  const sum = lessons.reduce((acc, l) => acc + l.progress.percentDone, 0);
  return Math.round(sum / total);
}

export function calcCompletedLessons(lessons: readonly GroupLesson[]) {
  return lessons.filter((l) => l.progress.studentsDone > 0).length;
}
