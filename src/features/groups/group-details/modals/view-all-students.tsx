'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import type { GroupStudent } from '@/features/groups/utils/types';

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        {students.length > 2 && (
          <Button variant="ghost" className="ml-auto">
            View all
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name / username / telegram / level..."
        />

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="divide-y">
            {filtered.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between">
                <div className="min-w-0">
                  <div className="font-semibold truncate">{s.name}</div>
                  {s.username ? (
                    <div className="text-sm text-blue-600 truncate">@{s.username}</div>
                  ) : (
                    <div className="text-sm text-muted-foreground">—</div>
                  )}
                </div>

                <div className="text-sm text-muted-foreground shrink-0 ml-4">{s.level ?? '—'}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
