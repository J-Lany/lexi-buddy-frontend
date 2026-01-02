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

export function StatusPill({ loading, count }: { loading: boolean; count: number }) {
  if (loading) {
    return (
      <span className="ui-pill gap-1.5">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
        Generating…
      </span>
    );
  }

  if (count > 0) {
    return <span className="ui-pill">{count}</span>;
  }

  return <span className="ui-pill">—</span>;
}
