import { Suspense } from 'react';
import LessonDetailsPage from '@/features/lessons/lesson-details/components/lesson-details-page';

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={null}>
      <LessonDetailsPage lessonId={id} />;
    </Suspense>
  );
}
