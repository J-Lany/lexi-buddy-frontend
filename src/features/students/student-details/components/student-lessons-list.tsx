import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StudentLessonItem from './student-lesson-item';
import type { StudentDashboard } from '@/features/students/utils/types';

export default function StudentLessonsList({ lessons }: { lessons: StudentDashboard['lessons'] }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Lessons</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {lessons.length === 0 ? (
          <div className="text-sm text-muted-foreground">Nothing here</div>
        ) : (
          lessons.map((lesson) => <StudentLessonItem key={lesson.id} lesson={lesson} />)
        )}
      </CardContent>
    </Card>
  );
}
