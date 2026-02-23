import React from 'react';

import { cn } from '@/shared/lib/cn';

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('ui-panel overflow-hidden', className)}>{children}</div>;
}

export function StatusPill({ count }: { count: number }) {
  if (count > 0) {
    return <span className="ui-pill">{count}</span>;
  }

  return <span className="ui-pill">—</span>;
}
