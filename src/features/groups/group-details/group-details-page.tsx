'use client';

import * as React from 'react';
import { useGetGroupDashboard } from '@/features/groups/hooks/use-get-group-dashboard';
import StudentDetailsSkeleton from '@/features/students/student-details/components/student-details-skeleton';
import StudentDetailsError from '@/features/students/student-details/components/student-details-error';
import { NavBack } from '@/components/ui/nav-back';
import { EAppRoutes } from '@/lib/routes';

import GroupHeaderCard from '@/features/groups/group-details/components/group-header-card';
import GroupLessonsList from './components/group-lessons-list';

import { GroupStudentsTable } from '@/features/groups/group-details/components/group-students-table';
import { useRemoveStudent } from '@/features/groups/hooks/use-remove-student';

export default function GroupDetailsPage({ groupId }: { groupId: string }) {
  const { data, isLoading, isError } = useGetGroupDashboard(groupId);
  const removeMutation = useRemoveStudent(groupId);

  if (isLoading) return <StudentDetailsSkeleton />;
  if (isError || !data) return <StudentDetailsError />;

  const onRemoveStudent = (studentId: number) => {
    removeMutation.mutate(studentId);
  };

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="pt-1">
        <NavBack href={EAppRoutes.GROUPS} label="Groups" />
      </div>

      <GroupHeaderCard group={data.group} lessons={data.lessons} />
      <GroupLessonsList lessons={data.lessons} />

      <GroupStudentsTable
        groupId={groupId}
        students={data.students}
        onRemoveStudent={onRemoveStudent}
        isRemovingId={removeMutation.isPending ? (removeMutation.variables ?? null) : null}
      />
    </div>
  );
}
