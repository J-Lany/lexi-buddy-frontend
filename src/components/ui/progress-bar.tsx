'use client';

import { cn } from '@/lib/utils';

type StepProgressProps = {
  currentStep: number;
  steps: { label: string; description?: string }[];
  className?: string;
};

export function StepProgress({ currentStep, steps, className }: StepProgressProps) {
  const total = Math.max(steps.length, 1);
  const step = Math.min(Math.max(currentStep, 1), total);

  const progress = total === 1 ? 1 : (step - 1) / (total - 1);

  const active = steps[step - 1];

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="w-full max-w-[260px] sm:max-w-[320px]">
        <div className="relative">
          {/* track */}
          <div className="h-2 rounded-full bg-muted" />

          {/* fill */}
          <div
            className="absolute left-0 top-0 h-2 rounded-full bg-primary/70"
            style={{ width: `${progress * 100}%` }}
          />

          <div className="absolute inset-0 flex items-center justify-between px-0.5">
            {steps.map((_, i) => {
              const n = i + 1;
              const isDone = n < step;
              const isCurrent = n === step;

              return (
                <div key={n} className="relative grid place-items-center h-6 w-6 -mx-2">
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full transition',
                      isDone && 'bg-primary/70',
                      isCurrent && 'bg-primary',
                      !isDone && !isCurrent && 'bg-muted-foreground/30',
                    )}
                    aria-current={isCurrent ? 'step' : undefined}
                  />
                  {isCurrent ? (
                    <div className="absolute h-5 w-5 rounded-full ring-2 ring-primary/20" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="text-[15px] font-semibold leading-snug">{active?.label}</div>
        {active?.description ? (
          <div className="mt-1 text-[12px] text-muted-foreground leading-snug">
            {active.description}
          </div>
        ) : null}
      </div>
    </div>
  );
}
