import React from 'react';

import { cn } from '@/shared/lib/cn';

export function DetailsRow({
  label,
  value,
  icon,
  interactive,
  onClick,
  valueTone = 'default',
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  interactive?: boolean;
  onClick?: () => void;
  valueTone?: 'default' | 'tint' | 'muted';
}) {
  const Comp = interactive ? 'button' : 'div';
  const valueClass =
    valueTone === 'tint' ? 'ui-tint' : valueTone === 'muted' ? 'ui-meta' : 'ui-stat';

  return (
    <Comp
      type={interactive ? 'button' : undefined}
      onClick={interactive ? onClick : undefined}
      className={cn(
        'w-full flex items-center justify-between gap-4 px-4 py-3 text-left',
        interactive && 'ui-focus',
      )}
    >
      <div className="ui-meta">{label}</div>

      <div className="flex items-center gap-2 min-w-0">
        <div className={cn(valueClass, 'min-w-0')}>
          <span className="block truncate">{value}</span>
        </div>
        {icon ? <div className="shrink-0 text-muted-foreground">{icon}</div> : null}
      </div>
    </Comp>
  );
}
