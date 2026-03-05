import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getStudentLessonProgress } from '@/entities/students/api/get-student-lesson-progress';
import StudentLessonProgressWidget from '@/features/students/widgets/student-lesson-progress/student-lesson-progress-widget';
import { studentsKeys } from '@/shared/query';

export default async function Page({ params }: { params: { id: string; lessonId: string } }) {
  const studentId = Number(params.id);
  const lessonId = Number(params.lessonId);

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
