import StudentLessonProgressWidget from '@/features/students/widgets/student-lesson-progress/student-lesson-progress-widget';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) {
  const { id, lessonId } = await params;

  return <StudentLessonProgressWidget studentId={Number(id)} lessonId={Number(lessonId)} />;
}
