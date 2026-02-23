import { Check } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

export function StudentRow({
  selected,
  primary,
  secondary,
}: {
  selected: boolean;
  primary: string;
  secondary?: string;
}) {
  return (
    <div
      className={cn(
        'w-full',
        'flex items-center gap-3',
        'px-3 py-3.5',
        'rounded-xl',
        'transition-colors',
        selected ? 'bg-muted/40' : 'hover:bg-muted/30',
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-medium leading-snug truncate">{primary}</div>
        {secondary ? (
          <div className="text-[12px] text-muted-foreground leading-snug truncate">{secondary}</div>
        ) : null}
      </div>

      <div className="ml-auto shrink-0">
        {selected ? <Check className="size-5 opacity-60" /> : <div className="size-5" />}
      </div>
    </div>
  );
}
