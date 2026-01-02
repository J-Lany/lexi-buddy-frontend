'use client';

import Link from 'next/link';
import { Users } from 'lucide-react';

export type Group = {
  id: number;
  name: string;
  level?: string;
  studentsCount: number;
};

export function GroupRow({ group }: { group: Group }) {
  const meta = [group.level ? `Level ${group.level}` : null, `${group.studentsCount} students`]
    .filter(Boolean)
    .join(' · ');

  return (
    <Link
      href={`/groups/${group.id}`}
      className="ui-card ui-radius-card ui-focus block px-5 sm:px-6 py-4"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="ui-thumb h-9 w-9">
          <Users size={18} strokeWidth={2} className="text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <span className="ui-title">{group.name}</span>

            {group.level && <span className="ui-pill">{group.level}</span>}
          </div>

          <div className="mt-1 ui-meta">{meta}</div>
        </div>
      </div>
    </Link>
  );
}
