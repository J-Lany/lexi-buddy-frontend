'use client';

import * as React from 'react';

import type { GroupStudent } from '@/entities/groups/api/get-group-dashboard';
import { AddStudentToGroupModal } from '@/features/groups/modals/add-student-to-group/add-student-to-group-modal';
import { ViewAllStudentsDialog } from '@/features/groups/modals/view-all-students';
import { GroupStudentRow } from '@/features/groups/widgets/group-details/ui/group-students-table/group-students-row';
import { routes } from '@/shared/router/routes';
import { ResponsiveTableLayout } from '@/shared/ui/responsive-table-layout';
import { TableHeader } from '@/shared/ui/table-header';

import {
  GROUP_STUDENTS_TABLE_COLS,
  GROUP_STUDENTS_TABLE_COLUMNS,
} from './group-students-table.columns';

const PREVIEW_LIMIT = 5;

type Props = {
  students: GroupStudent[];
  groupId: number;
  onRemoveStudent: (studentId: number) => void;
  isRemovingId?: number | null;
  title?: string;
};

export function GroupStudentsTable({
  students,
  onRemoveStudent,
  isRemovingId,
  title = 'Students',
  groupId,
}: Props) {
  const hasMore = students.length > PREVIEW_LIMIT;
  const preview = hasMore ? students.slice(0, PREVIEW_LIMIT) : students;
  const existingStudentIds = React.useMemo(() => students.map((s) => s.id), [students]);

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between px-1">
        <div className="text-[18px] sm:text-[20px] font-semibold tracking-tight">{title}</div>

        <div className="flex items-center gap-2">
          {hasMore ? <ViewAllStudentsDialog students={students} title="All students" /> : null}
          <AddStudentToGroupModal groupId={groupId} existingStudentIds={existingStudentIds} />
        </div>
      </div>

      <ResponsiveTableLayout
        header={
          <TableHeader
            columns={GROUP_STUDENTS_TABLE_COLUMNS}
            colsClassName={GROUP_STUDENTS_TABLE_COLS}
          />
        }
        desktopBody={preview.map((student) => {
          const href = `${routes.students}/${student.id}`;

          return (
            <GroupStudentRow
              key={student.id}
              student={student}
              href={href}
              variant="table"
              removing={isRemovingId === student.id}
              onRemove={() => onRemoveStudent(student.id)}
            />
          );
        })}
        mobileBody={preview.map((student) => {
          const href = `${routes.students}/${student.id}`;

          return (
            <GroupStudentRow
              key={student.id}
              student={student}
              href={href}
              variant="card"
              removing={isRemovingId === student.id}
              onRemove={() => onRemoveStudent(student.id)}
            />
          );
        })}
      />
    </div>
  );
}
