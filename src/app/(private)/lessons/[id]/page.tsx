import { Suspense } from 'react';

import { LessonDetailsWidget } from '@/features/lessons/widgets/lesson-details/lesson-details-widget';

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={null}>
      <LessonDetailsWidget lessonId={Number(id)} />
    </Suspense>
  );
}
