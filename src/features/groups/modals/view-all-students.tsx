'use client';

import * as React from 'react';

import { GroupStudent } from '@/entities/groups/api/get-group-dashboard';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { ResponsiveModal } from '@/shared/ui/responsive-modal';

export function ViewAllStudentsDialog({
  students,
  title = 'All students',
}: {
  students: GroupStudent[];
  title?: string;
}) {
  const [q, setQ] = React.useState('');

  const filtered = React.useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return students;
    return students.filter((s) => {
      return (
        s.name.toLowerCase().includes(query) ||
        (s.username ?? '').toLowerCase().includes(query) ||
        (s.telegramValue ?? '').toLowerCase().includes(query) ||
        (s.level ?? '').toLowerCase().includes(query)
      );
    });
  }, [q, students]);

  if (students.length <= 5) return null;

  return (
    <ResponsiveModal
      maxWidthClassName="sm:max-w-[560px]"
      trigger={
        <Button variant="ghost" className="ml-auto">
          View all
        </Button>
      }
      title={title}
    >
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name / username / telegram / level..."
        className="mb-3"
      />

      <div className="flex flex-col gap-2">
        {filtered.map((s) => (
          <div key={s.id} role="button" tabIndex={0} className="ui-inset-x ui-list-row">
            <div className="min-w-0">
              <div className="ui-title">{s.name}</div>
              {s.username ? (
                <div className="ui-tint">@{s.username}</div>
              ) : (
                <div className="ui-meta">—</div>
              )}
            </div>
            <div className="shrink-0 ml-4">
              <span className="ui-pill">{s.level ?? '—'}</span>
            </div>
          </div>
        ))}
      </div>
    </ResponsiveModal>
  );
}
