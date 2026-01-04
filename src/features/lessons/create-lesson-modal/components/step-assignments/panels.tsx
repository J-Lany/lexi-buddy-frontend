import { cn } from '@/lib/utils';
import React from 'react';
import { Loader2 } from 'lucide-react';

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('ui-panel overflow-hidden', className)}>{children}</div>;
}

export function PanelRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('px-4 py-4', className)}>{children}</div>;
}

export function StatusPill({ count }: { count: number }) {
  if (count > 0) {
    return <span className="ui-pill">{count}</span>;
  }

  return <span className="ui-pill">—</span>;
}
