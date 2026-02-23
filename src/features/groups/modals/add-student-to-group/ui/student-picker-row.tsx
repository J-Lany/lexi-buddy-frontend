'use client';

import * as React from 'react';

import type { StudentDto } from '@/entities/students/api/get-my-students';
import { cn } from '@/shared/lib/cn';
import { StudentAvatar } from '@/shared/ui/student-avatar';

type Props = {
  student: StudentDto;
  onPick: (studentId: number) => void;
  pending?: boolean;
};

export function StudentPickerRow({ student, onPick, pending = false }: Props) {
  const telegramLabel = student.username?.trim() ? `@${student.username.trim()}` : '—';
  const levelLabel = student.level?.trim() ? student.level.trim() : '—';

  return (
    <button
      type="button"
      onClick={() => onPick(student.id)}
      disabled={pending}
      className={cn('ui-inset-x ui-list-row px-4', 'text-left', pending && 'opacity-60')}
    >
      <div className="flex items-center gap-3 min-w-0">
        <StudentAvatar
          username={student.username ?? null}
          avatarUrl={student.avatarUrl ?? null}
          size={36}
        />

        <div className="min-w-0">
          <div className="ui-title truncate">{student.name}</div>
          <div className="ui-meta truncate">{telegramLabel}</div>
        </div>
      </div>

      <div className="shrink-0 ml-4 flex items-center gap-2">
        <span className={cn('ui-pill', levelLabel === '—' && 'opacity-70')}>{levelLabel}</span>
        {pending ? <span className="ui-meta">Adding…</span> : null}
      </div>
    </button>
  );
}
