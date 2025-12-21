'use client';

import StudentDetailsSkeleton from '@/features/students/get-student/components/student-details-skeleton';
import StudentDetailsError from '@/features/students/get-student/components/student-details-error';
import StudentProfileCard from '@/features/students/get-student/components/student-profile-card';
import StudentStatsGrid from '@/features/students/get-student/components/student-stats-grid';
import StudentLessonsList from '@/features/students/get-student/components/student-lessons-list';
import { useGetStudentDashboard } from '@/features/students/hooks/use-get-student-dashboard';

export default function StudentDetailsPage({ studentId }: { studentId: string }) {
  const { data, isLoading, isError } = useGetStudentDashboard(studentId);

  if (isLoading) return <StudentDetailsSkeleton />;
  if (isError || !data) return <StudentDetailsError />;

  return (
    <div className="flex flex-col gap-6 pb-17">
      <StudentProfileCard student={data.student} groups={data.groups} stats={data.stats} />
      <StudentStatsGrid stats={data.stats} lessonsTotal={data.lessons.length} />
      <StudentLessonsList lessons={data.lessons} />
    </div>
  );
}
