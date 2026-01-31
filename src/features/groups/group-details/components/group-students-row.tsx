import { User } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { RemoveStudentConfirm } from '@/features/groups/group-details/components/remove-student-confirm';
import { GroupStudent } from '@/features/groups/utils/types';
import { StudentAvatar } from '@/features/students/students-table/components/student-avatar';
import { AGE_ICONS } from '@/features/students/students-table/components/student-row';
import { cn } from '@/lib/utils';

type Props = {
  student: GroupStudent;
  variant: 'card' | 'table';
  onRemove: () => void;
  removing?: boolean;
};
export function GroupStudentRow({ student, variant, onRemove, removing }: Props) {
  const AgeIcon = student.ageGroup ? AGE_ICONS[student.ageGroup] : User;

  const telegram = student.username?.trim() ? `@${student.username.trim()}` : '—';
  const level = student.level?.trim() ? student.level.trim() : '—';

  if (variant === 'table') {
    return (
      <div
        className={cn(
          'px-6 py-4',
          'transition-colors',
          'hover:bg-[color-mix(in_oklch,var(--foreground)_3%,white_97%)]',
        )}
      >
        <div className="grid grid-cols-[2fr_1.5fr_92px_44px] gap-4 items-center">
          <Link
            href={`/students/${student.id}`}
            className="contents focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center gap-3 min-w-0">
              <StudentAvatar
                username={student.username}
                avatarUrl={student.avatarUrl}
                FallbackIcon={(props) => <AgeIcon {...props} />}
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
        <Link
          href={`/students/${student.id}`}
          className="flex items-start gap-3 flex-1 min-w-0 ui-focus rounded-xl"
        >
          <StudentAvatar
            username={student.username}
            avatarUrl={student.avatarUrl}
            FallbackIcon={(props) => <AgeIcon {...props} />}
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
