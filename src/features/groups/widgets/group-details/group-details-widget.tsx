'use client';

import * as React from 'react';

import { useRemoveStudentFromGroupMutation } from '@/entities/groups/model/mutation/remove-student-from-group';
import { useGroupDashboardQuery } from '@/entities/groups/model/query/get-group-dashboard';
import GroupLessonsList from '@/features/groups/widgets/group-details/ui/group-lessons-list/group-lessons-list';
import { GroupProfileSummary } from '@/features/groups/widgets/group-details/ui/group-profile-summary/group-profile-summary';
import { GroupStudentsTable } from '@/features/groups/widgets/group-details/ui/group-students-table/group-students-table';
import { routes } from '@/shared/router/routes';
import { DetailsErrorCard } from '@/shared/ui/details/details-error-card';
import DetailsLayoutSkeleton from '@/shared/ui/details/details-layout-skeleton';
import { NavBack } from '@/shared/ui/nav-back';

export default function GroupDetailsWidget({ groupId }: { groupId: number }) {
  const { data, isLoading, isError } = useGroupDashboardQuery(groupId);

  const removeMutation = useRemoveStudentFromGroupMutation();
  const removingStudentId = removeMutation.isPending
    ? (removeMutation.variables?.studentId ?? null)
    : null;

  if (isLoading) return <DetailsLayoutSkeleton />;

  if (isError || !data)
    return (
      <DetailsErrorCard
        backHref={routes.groups}
        backLabel="Groups"
        title="Unable to load group"
        description="The group details couldn’t be loaded. Please try again."
      />
    );

  const onRemoveStudent = (studentId: number) => {
    removeMutation.mutate({ studentId, groupId });
  };

  return (
    <div className="max-w-5xl flex flex-col gap-6">
      <div className="pt-1">
        <NavBack href={routes.groups} label="Groups" />
      </div>

      <GroupProfileSummary group={data.group} lessons={data.lessons} />
      <GroupLessonsList lessons={data.lessons} />

      <GroupStudentsTable
        groupId={groupId}
        students={data.students}
        onRemoveStudent={onRemoveStudent}
        isRemovingId={removingStudentId}
      />
    </div>
  );
}
