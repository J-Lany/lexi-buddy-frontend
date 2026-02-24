import StudentLessonProgressWidget from '@/features/students/widgets/student-lesson-progress/student-lesson-progress-widget';

export default function Page({ params }: { params: { id: string; lessonId: string } }) {
  const studentId = Number(params.id);
  const lessonId = Number(params.lessonId);

  return <StudentLessonProgressWidget studentId={studentId} lessonId={lessonId} />;
}
