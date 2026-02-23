'use client';

import Link from 'next/link';

import type { GroupStudent } from '@/entities/groups/api/get-group-dashboard';
import { RemoveStudentConfirm } from '@/features/groups/widgets/group-details/ui/remove-student-confirm';
import { cn } from '@/shared/lib/cn';
import { StudentAvatar } from '@/shared/ui/student-avatar';

import { GROUP_STUDENTS_TABLE_COLS } from './group-students-table.columns';

type Props = {
  student: GroupStudent;
  variant: 'card' | 'table';
  href: string;
  onRemove: () => void;
  removing?: boolean;
};

export function GroupStudentRow({ student, variant, href, onRemove, removing }: Props) {
  const telegram = student.username?.trim() ? `@${student.username.trim()}` : '—';
  const level = student.level?.trim() ? student.level.trim() : '—';

  if (variant === 'table') {
    return (
      <div
        className={cn(
          'px-6 py-4 transition-colors',
          'hover:bg-[color-mix(in_oklch,var(--foreground)_3%,white_97%)]',
        )}
      >
        <div className={cn('grid items-center gap-4', GROUP_STUDENTS_TABLE_COLS)}>
          <Link
            href={href}
            className="contents focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center gap-3 min-w-0">
              <StudentAvatar
                username={student.username ?? null}
                avatarUrl={student.avatarUrl ?? null}
                size={36}
              />
              <div className="min-w-0">
                <div className="ui-title truncate">{student.name}</div>
              </div>
            </div>

            <div className="ui-meta truncate">{telegram}</div>

            <div className="flex justify-end">
              <span className={cn('ui-pill', level === '—' && 'opacity-70')}>{level}</span>
            </div>
          </Link>

          <div className="flex justify-end">
            <RemoveStudentConfirm
              onRemove={onRemove}
              removing={removing}
              studentName={student.name}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ui-card ui-radius-card block px-5 py-4">
      <div className="flex items-start gap-3">
        <Link href={href} className="flex items-start gap-3 flex-1 min-w-0 ui-focus rounded-xl">
          <StudentAvatar
            username={student.username ?? null}
            avatarUrl={student.avatarUrl ?? null}
            size={36}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <span className="ui-title truncate">{student.name}</span>
              <span className={cn('ui-pill', level === '—' && 'opacity-70')}>{level}</span>
            </div>

            <div className="mt-2 ui-meta truncate">
              <span className="text-muted-foreground">Telegram: </span>
              <span className="text-foreground/80">{telegram}</span>
            </div>
          </div>
        </Link>

        <div className="shrink-0">
          <RemoveStudentConfirm
            onRemove={onRemove}
            removing={removing}
            studentName={student.name}
          />
        </div>
      </div>
    </div>
  );
}
