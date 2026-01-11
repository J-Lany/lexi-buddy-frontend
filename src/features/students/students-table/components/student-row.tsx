'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Baby, Users, User } from 'lucide-react';
import { EAgeGroup } from '@/lib/enums';
import { cn } from '@/lib/utils';
import { StudentAvatar } from '@/features/students/students-table/components/student-avatar';
import { useMergedQuery } from '@/lib/hooks/use-merged-query';
import { EAppRoutes } from '@/lib/routes';

type Group = {
  id: number;
  name: string;
};

export type Student = {
  id: number;
  name: string;
  username: string;
  avatarUrl: string | null;
  groups?: Group[];
  level: string;
  ageGroup: EAgeGroup;
};

export const AGE_ICONS: Record<EAgeGroup, LucideIcon> = {
  [EAgeGroup.CHILD]: Baby,
  [EAgeGroup.TEENAGER]: Users,
  [EAgeGroup.ADULT]: User,
};

type Props = {
  student: Student;
  variant?: 'card' | 'table';
  showIcon?: boolean;
};

export function StudentRow({ student, variant = 'card' }: Props) {
  const { searchParams } = useMergedQuery();
  const qs = searchParams.toString();
  const hrefToStudent = `${EAppRoutes.STUDENTS}/${student.id}${qs ? `?${qs}` : ''}`;

  const AgeIcon = AGE_ICONS[student.ageGroup] ?? User;

  const telegram = student.username?.trim() ? `@${student.username}` : '—';
  const group = student.groups?.[0]?.name?.trim() ? student.groups[0].name.trim() : '—';
  const level = student.level?.trim() ? student.level : '—';

  if (variant === 'table') {
    return (
      <Link
        href={hrefToStudent}
        className={cn(
          'block px-6 py-4',
          'transition-colors',
          'hover:bg-[color-mix(in_oklch,var(--foreground)_3%,white_97%)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        )}
      >
        <div className="grid grid-cols-[2fr_1.5fr_1.5fr_92px] gap-4 items-center">
          <div className="flex items-center gap-3 min-w-0">
            <StudentAvatar
              username={student.username ?? null}
              avatarUrl={student.avatarUrl}
              FallbackIcon={(props) => <AgeIcon {...props} />}
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
      </Link>
    );
  }

  // Mobile card
  return (
    <Link
      href={hrefToStudent}
      className="ui-card ui-radius-card ui-focus block px-5 sm:px-6 py-4 cursor-pointer"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <StudentAvatar
          username={student.username ?? null}
          avatarUrl={student.avatarUrl}
          FallbackIcon={(props) => <AgeIcon {...props} />}
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
    </Link>
  );
}
