'use client';

import { cn } from '@/lib/utils';

export function StepProgress({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium border',
            step >= 1
              ? 'bg-primary text-primary-foreground border-primary'
              : 'text-muted-foreground',
          )}
        >
          1
        </div>
        <div className={cn('h-[2px] w-10 rounded-full', step >= 2 ? 'bg-primary' : 'bg-muted')} />
        <div
          className={cn(
            'h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium border',
            step >= 2
              ? 'bg-primary text-primary-foreground border-primary'
              : 'text-muted-foreground',
          )}
        >
          2
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium">{step === 1 ? 'Group details' : 'Add students'}</span>
        <span className="text-xs text-muted-foreground">Step {step} of 2</span>
      </div>
    </div>
  );
}
