import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import { getStudentDashboard } from '@/entities/students/api/get-student-dashboard';
import StudentDetailsWidget from '@/features/students/widgets/student-details/student-details-widget';
import { studentsKeys } from '@/shared/query';

export default async function StudentPage({ params }: { params: { id: string } }) {
  const studentId = Number(params.id);

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: studentsKeys.dashboard(studentId),
    queryFn: () => getStudentDashboard(studentId),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <Suspense fallback={null}>
        <StudentDetailsWidget studentId={studentId} />
      </Suspense>
    </HydrationBoundary>
  );
}
