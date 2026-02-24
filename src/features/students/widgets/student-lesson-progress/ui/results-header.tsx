'use client';

import Link from 'next/link';

import { routes } from '@/shared/router/routes';

export function ResultsHeader({ lessonId }: { lessonId: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="ui-title font-medium tracking-tight text-foreground">Results</div>
        <div className="mt-0.5 ui-meta truncate">Progress by assignment type</div>
      </div>

      <Link
        href={`${routes.lessons}/${lessonId}`}
        className="ui-focus inline-flex items-center gap-2 rounded-full px-3 py-2
                   ui-meta tracking-tight
                   text-foreground/80 hover:text-foreground transition-colors"
      >
        View lesson
        <span className="text-muted-foreground">→</span>
      </Link>
    </div>
  );
}
