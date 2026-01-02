'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type StepProgressProps = {
  currentStep: number; // 1..n
  steps: { label: string; description?: string }[];
  className?: string;
};

export function StepProgress({ currentStep, steps, className }: StepProgressProps) {
  const total = Math.max(steps.length, 1);
  const clamped = Math.min(Math.max(currentStep, 1), total);

  // 0..1
  const p = total === 1 ? 1 : (clamped - 1) / (total - 1);

  const active = steps[clamped - 1];

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-center">
        <div className="relative w-[240px] sm:w-[320px]">
          <div className="h-[6px] rounded-full bg-muted/60" />

          <div
            className="absolute left-0 top-0 h-[6px] rounded-full bg-primary/55"
            style={{ width: `${p * 100}%` }}
          />

          <div className="absolute inset-0 flex items-center justify-between px-[2px]">
            {steps.map((_, i) => {
              const stepNo = i + 1;
              const isPastOrCurrent = stepNo <= clamped;
              return (
                <span
                  key={stepNo}
                  className={cn(
                    'block size-[6px] rounded-full transition-opacity',
                    isPastOrCurrent ? 'bg-primary/70' : 'bg-foreground/15',
                  )}
                />
              );
            })}
          </div>

          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `calc(${p * 100}% - 10px)` }}
          >
            <span className="grid place-items-center">
              <span className="size-5 rounded-full bg-primary/20" />
              <span className="absolute size-[10px] rounded-full bg-primary shadow-sm" />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center">
        <div className="text-[15px] font-semibold leading-snug">{active?.label}</div>
        {active?.description ? (
          <div className="ui-meta mt-0.5 text-center max-w-[28ch]">{active.description}</div>
        ) : null}
      </div>
    </div>
  );
}
