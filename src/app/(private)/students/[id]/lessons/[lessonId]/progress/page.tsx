import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getStudentLessonProgress } from '@/entities/students/api/get-student-lesson-progress';
import StudentLessonProgressWidget from '@/features/students/widgets/student-lesson-progress/student-lesson-progress-widget';
import { studentsKeys } from '@/shared/query';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id, lessonId: lessonIdParam } = await params;
  const studentId = Number(id);
  const lessonId = Number(lessonIdParam);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: studentsKeys.lessonProgress(studentId, lessonId),
    queryFn: () => getStudentLessonProgress({ studentId, lessonId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <StudentLessonProgressWidget studentId={studentId} lessonId={lessonId} />
      </Suspense>
    </HydrationBoundary>
  );
}
