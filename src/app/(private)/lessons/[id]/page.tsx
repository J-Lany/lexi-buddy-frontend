import LessonDetailsPage from '@/features/lessons/lesson-details/components/lesson-details-page';

export default function LessonPage({ params }: { params: { id: string } }) {
  return <LessonDetailsPage lessonId={params.id} />;
}
