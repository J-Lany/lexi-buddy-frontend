'use client';

import { Users } from 'lucide-react';

import { CardHeader } from '@/shared/ui/card';

type Props = {
  title: string;
  levelLabel: string | null;
  studentsCount: number;
};

export function HeaderSection({ title, levelLabel, studentsCount }: Props) {
  return (
    <CardHeader className="pb-2">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="ui-card-title truncate">{title}</div>

            {levelLabel ? (
              <span className="ui-pill !h-7 !px-3 opacity-90 shrink-0">{levelLabel}</span>
            ) : null}
          </div>

          <div className="ui-meta mt-1">Group overview</div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4" />
          <span className="ui-meta tabular-nums">{studentsCount}</span>
        </div>
      </div>
    </CardHeader>
  );
}
