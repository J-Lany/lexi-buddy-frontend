'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { StudentAvatar } from '@/features/students/students-table/components/student-avatar';
import { AGE_ICONS } from '@/features/students/students-table/components/student-row';
import { User, Plus, X } from 'lucide-react';
import { EAgeGroup } from '@/lib/enums';
import { ViewAllStudentsDialog } from '@/features/groups/group-details/modals/view-all-students';
import { GroupStudentRow } from '@/features/groups/group-details/components/group-students-row';
import { AddStudentToGroupDialog } from '@/features/groups/group-details/modals/add-student-to-group-dialog';

export type GroupStudent = {
  id: number;
  name: string;
  username: string | null;
  avatarUrl: string | null;
  level: string | null;
  ageGroup: EAgeGroup;
  telegramValue?: string | null;
};

const PREVIEW_LIMIT = 5;

export function GroupStudentsTable({
  students,
  onRemoveStudent,
  isRemovingId,
  title = 'Students',
  groupId,
}: {
  students: GroupStudent[];
  onRemoveStudent: (studentId: number) => void;
  isRemovingId?: number | null;
  title?: string;
  groupId: string;
}) {
  const hasMore = students.length > PREVIEW_LIMIT;
  const preview = hasMore ? students.slice(0, PREVIEW_LIMIT) : students;
  const existingIds = students.map((s) => s.id);

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between px-1">
        <div className="text-[18px] sm:text-[20px] font-semibold tracking-tight">{title}</div>

        <div className="flex items-center gap-2">
          {hasMore ? <ViewAllStudentsDialog students={students} title="All students" /> : null}
          <AddStudentToGroupDialog groupId={groupId} existingStudentIds={existingIds} />
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="ui-panel overflow-hidden">
          <div className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="px-6 py-3">
              <div className="grid items-center gap-4 grid-cols-[2fr_1.5fr_92px_44px]">
                <div className="ui-meta tracking-wide uppercase">Name</div>
                <div className="ui-meta tracking-wide uppercase">Telegram</div>
                <div className="ui-meta tracking-wide uppercase text-right">Level</div>
                <div className="sr-only">Actions</div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-border/60 overflow-y-auto ui-scroll">
            {preview.map((s) => (
              <GroupStudentRow
                key={s.id}
                student={s}
                variant="table"
                removing={isRemovingId === s.id}
                onRemove={() => onRemoveStudent(s.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:hidden">
        {preview.map((s) => (
          <GroupStudentRow
            key={s.id}
            student={s}
            variant="card"
            removing={isRemovingId === s.id}
            onRemove={() => onRemoveStudent(s.id)}
          />
        ))}
      </div>
    </div>
  );
}
