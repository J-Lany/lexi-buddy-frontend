'use client';

import Link from 'next/link';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Group = {
  id: number;
  name: string;
  level: string | null;
  students: Array<{
    id: number;
    name: string;
    level: string | null;
    telegramValue: string;
  }>;
};

type Props = {
  group: Group;
  variant?: 'card' | 'table';
  showIcon?: boolean;
};

export function GroupRow({ group, variant = 'card', showIcon = true }: Props) {
  const level = group.level?.trim() ? group.level : '—';
  const studentsCount = group.students?.length ?? 0;

  if (variant === 'table') {
    return (
      <Link
        href={`/groups/${group.id}`}
        className={cn(
          'block px-6 py-4',
          'transition-colors',
          'hover:bg-[color-mix(in_oklch,var(--foreground)_3%,white_97%)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        )}
      >
        <div className="grid grid-cols-[2fr_140px_140px] items-center gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {showIcon ? (
              <div className="ui-thumb h-9 w-9">
                <Users size={18} strokeWidth={2} className="text-primary" />
              </div>
            ) : null}

            <div className="min-w-0">
              <div className="ui-title truncate">{group.name}</div>
              <div className="ui-meta truncate">{studentsCount} students</div>
            </div>
          </div>

          <div className="ui-meta">{level}</div>

          <div className="flex justify-end">
            <span className="ui-pill">{studentsCount}</span>
          </div>
        </div>
      </Link>
    );
  }

  const meta = [`Level ${level}`, `${studentsCount} students`].join(' · ');

  return (
    <Link
      href={`/groups/${group.id}`}
      className="ui-card ui-radius-card ui-focus block px-5 sm:px-6 py-4"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {showIcon ? (
          <div className="ui-thumb h-9 w-9">
            <Users size={18} strokeWidth={2} className="text-primary" />
          </div>
        ) : null}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <span className="ui-title">{group.name}</span>
            <span className={cn('ui-pill', level === '—' && 'opacity-70')}>{level}</span>
          </div>

          <div className="mt-1 ui-meta">{meta}</div>
        </div>
      </div>
    </Link>
  );
}
