import { Check } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

type Props = {
  selected: boolean;
};

export function AssignSelectionMark({ selected }: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
        selected
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border/70 bg-background',
      )}
    >
      {selected ? <Check className="h-3.5 w-3.5" /> : null}
    </span>
  );
}
