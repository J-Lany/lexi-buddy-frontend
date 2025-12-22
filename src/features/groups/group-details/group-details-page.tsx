'use client';

import GroupProfileCard from './components/group-profile-card';
import GroupStatsGrid from './components/group-stats-grid';
import GroupLessonsList from './components/group-lessons-list';
import GroupStudentsList from './components/group-students-list';
import { useGetGroupDashboard } from '@/features/groups/hooks/use-get-group-dashboard';
import StudentDetailsSkeleton from '@/features/students/student-details/components/student-details-skeleton';
import StudentDetailsError from '@/features/students/student-details/components/student-details-error';

export default function GroupDetailsPage({ groupId }: { groupId: string }) {
  const { data, isLoading, isError } = useGetGroupDashboard(groupId);

  if (isLoading) return <StudentDetailsSkeleton />;
  if (isError || !data) return <StudentDetailsError />;

  return (
    <div className="max-w-5xl flex flex-col gap-6 pb-17">
      <GroupProfileCard group={data.group} />
      <GroupStatsGrid
        studentsCount={data.group.studentsCount}
        lessonsCount={data.lessons.length}
        lessons={data.lessons}
      />
      <GroupLessonsList lessons={data.lessons} />
      <GroupStudentsList students={data.students} />
    </div>
  );
}
