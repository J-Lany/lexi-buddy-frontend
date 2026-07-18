'use client';

import { StudentDto } from '@/entities/students/api/get-my-students';
import { STUDENTS_TABLE_COLS } from '@/features/students/widgets/students-list/ui/students-table/students-table.columns';
import { cn } from '@/shared/lib/cn';
import { RowLink } from '@/shared/ui/row-link';
import { StudentAvatar } from '@/shared/ui/student-avatar';

type Props = {
  student: StudentDto;
  href: string;
  variant?: 'card' | 'table';
};

export function StudentsTableRow({ student, variant = 'card', href }: Props) {
  const telegram = student.username?.trim() ? `@${student.username}` : '—';
  const group = student.groups?.[0]?.name?.trim() ? student.groups[0].name.trim() : '—';
  const level = student.level?.trim() ? student.level : '—';

  if (variant === 'table') {
    return (
      <RowLink href={href}>
        <div className={cn('grid items-center gap-4', STUDENTS_TABLE_COLS)}>
          <div className="flex items-center gap-3 min-w-0">
            <StudentAvatar
              username={student.username ?? null}
              avatarUrl={student.avatarUrl}
              size={36}
            />

            <div className="min-w-0">
              <div className="ui-title truncate">{student.name}</div>
            </div>
          </div>

          <div className="ui-meta truncate">{telegram}</div>
          <div className="ui-meta truncate">{group}</div>
          <div className="flex justify-end">
            <span className={cn('ui-pill', level === '—' && 'opacity-70')}>{level}</span>
          </div>
        </div>
      </RowLink>
    );
  }

  return (
    <RowLink
      href={href}
      className="ui-card ui-radius-card ui-focus block px-5 sm:px-6 py-4 cursor-pointer"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <StudentAvatar
          username={student.username ?? null}
          avatarUrl={student.avatarUrl}
          size={36}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <span className="ui-title">{student.name}</span>
            <span className={cn('ui-pill', level === '—' && 'opacity-70')}>{level}</span>
          </div>

          <div className="mt-2 grid gap-1">
            <div className="ui-meta">
              <span className="text-muted-foreground">Telegram: </span>
              <span className="text-foreground/80">{telegram}</span>
            </div>
            <div className="ui-meta">
              <span className="text-muted-foreground">Group: </span>
              <span className="text-foreground/80">{group}</span>
            </div>
          </div>
        </div>
      </div>
    </RowLink>
  );
}
