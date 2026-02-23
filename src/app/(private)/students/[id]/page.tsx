import { Suspense } from 'react';

import StudentDetailsWidget from '@/features/students/widgets/student-details/student-details-widget';

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={null}>
      <StudentDetailsWidget studentId={Number(id)} />
    </Suspense>
  );
}
