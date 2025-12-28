'use client';

import { cn } from '@/lib/utils';
type StepProgressProps = {
  currentStep: number;
  steps: { label: string; description?: string }[];
};

export function StepProgress({ currentStep, steps }: StepProgressProps) {
  const total = steps.length;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {steps.map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber <= currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex items-center gap-2">
              <div
                className={cn(
                  'h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium border',
                  isActive
                    ? 'bg-primary text-white border-primary'
                    : 'text-muted-foreground border-muted-foreground/40',
                  isCompleted && 'bg-green-500 text-white',
                )}
              >
                {stepNumber}
              </div>

              {stepNumber < total && (
                <div
                  className={cn(
                    'h-[2px] w-5 sm:w-12 rounded-full',
                    stepNumber < currentStep ? 'bg-primary' : 'bg-muted',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center">
        <span className="text-sm font-medium text-gray-700">{steps[currentStep - 1]?.label}</span>
        <p className="text-xs text-muted-foreground mt-1">{steps[currentStep - 1]?.description}</p>
      </div>
    </div>
  );
}
