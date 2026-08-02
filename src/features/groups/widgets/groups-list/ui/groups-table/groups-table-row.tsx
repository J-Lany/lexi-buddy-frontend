'use client';

import { Users } from 'lucide-react';

import type { GroupDto } from '@/entities/groups/api/get-my-groups';
import { cn } from '@/shared/lib/cn';
import { RowLink } from '@/shared/ui/row-link';

import { GROUPS_TABLE_COLS } from './groups-table.columns';

type Props = {
  group: GroupDto;
  href: string;
  variant?: 'card' | 'table';
  showIcon?: boolean;
};

export function GroupsTableRow({ group, href, variant = 'card', showIcon = true }: Props) {
  const level = group.level?.trim() ? group.level : '—';
  const studentsCount = group.students.length;

  if (variant === 'table') {
    return (
      <RowLink href={href}>
        <div className={cn('grid items-center gap-4', GROUPS_TABLE_COLS)}>
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

          <div className="ui-meta truncate">{level}</div>

          <div className="flex justify-end">
            <span className="ui-pill">{studentsCount}</span>
          </div>
        </div>
      </RowLink>
    );
  }

  const meta = [`Level ${level}`, `${studentsCount} students`].join(' · ');

  return (
    <RowLink
      href={href}
      className="ui-card ui-radius-card ui-focus block px-5 sm:px-6 py-4 cursor-pointer"
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
    </RowLink>
  );
}
