'use client';

import { useGetStudentDashboard } from '@/features/students/hooks/use-get-student-dashboard';
import StudentDetailsError from '@/features/students/student-details/components/student-details-error';
import StudentDetailsSkeleton from '@/features/students/student-details/components/student-details-skeleton';
import StudentStatsGrid from '@/features/students/student-details/components/student-stats-grid';
import StudentProfileCard from '@/features/students/student-details/components/student-profile-card';
import StudentLessonsList from '@/features/students/student-details/components/student-lessons-list';
import { NavBack } from '@/components/ui/nav-back';
import { EAppRoutes } from '@/lib/routes';

export default function StudentDetailsPage({ studentId }: { studentId: string }) {
  const { data, isLoading, isError } = useGetStudentDashboard(studentId);

  if (isLoading) return <StudentDetailsSkeleton />;
  if (isError || !data) return <StudentDetailsError />;

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="pt-1">
        <NavBack href={EAppRoutes.STUDENTS} label="Students" />
      </div>
      <StudentProfileCard student={data.student} groups={data.groups} stats={data.stats} />
      <StudentStatsGrid stats={data.stats} lessonsTotal={data.lessons.length} />
      <StudentLessonsList lessons={data.lessons} />
    </div>
  );
}
