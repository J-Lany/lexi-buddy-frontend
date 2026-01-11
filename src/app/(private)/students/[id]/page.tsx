import { Suspense } from 'react';
import StudentDetailsPage from '@/features/students/student-details/student-details-page';

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={null}>
      <StudentDetailsPage studentId={id} />
    </Suspense>
  );
}
