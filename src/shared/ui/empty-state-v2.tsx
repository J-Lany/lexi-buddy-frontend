'use client';

import './empty-state-v2.css';

import React from 'react';

import { cn } from '@/shared/lib/cn';

export type EmptyStateV2Step = {
  id: string;
  title: string;
  desc: string;
};

export const emptyStatePrimaryActionClassName =
  'h-12 w-full rounded-2xl px-6 text-[15px] font-semibold shadow-md transition-all sm:hover:-translate-y-0.5 sm:hover:shadow-lg active:translate-y-0 sm:w-56';

type EmptyStateV2Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: [EmptyStateV2Step, EmptyStateV2Step, EmptyStateV2Step];
  primaryAction: React.ReactNode;
  secondaryAction?: React.ReactNode;
  pinTopLeft?: string;
  pinBottomRight?: string;
  className?: string;
};

export function EmptyStateV2({
  icon,
  title,
  description,
  steps,
  primaryAction,
  secondaryAction,
  pinTopLeft,
  pinBottomRight,
  className,
}: EmptyStateV2Props) {
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <section
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={cn(
        'w-full max-w-[980px] mx-auto py-0 sm:py-6',
        'flex flex-col items-center gap-3 sm:gap-6',
        'sm:flex-row sm:items-center sm:justify-center sm:gap-8',
        className,
      )}
    >
      {/* Glyph */}
      <div className="es-v2-glyph shrink-0" aria-hidden>
        {icon}

        {pinTopLeft && (
          <div className="es-v2-pin tl" aria-hidden>
            <span className="dot" style={{ background: 'oklch(0.7 0.16 160)' }} />
            {pinTopLeft}
          </div>
        )}

        {pinBottomRight && (
          <div className="es-v2-pin br" aria-hidden>
            <span className="dot" style={{ background: 'oklch(0.7 0.16 60)' }} />
            {pinBottomRight}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col items-center sm:items-start w-full max-w-[560px] text-center sm:text-left">
        <h2
          id={titleId}
          className="font-extrabold tracking-tight leading-tight text-[23px] sm:text-[28px] mb-2.5"
        >
          {title}
        </h2>

        <p
          id={descriptionId}
          className="max-w-[34ch] sm:max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground mb-4 sm:mb-[18px]"
        >
          {description}
        </p>

        <div
          className="order-1 sm:order-2 flex flex-wrap gap-3 w-full justify-center sm:justify-start mb-5 sm:mb-0"
          data-testid="empty-state-actions"
        >
          {primaryAction}
          {secondaryAction}
        </div>

        <div
          className={cn(
            'order-2 sm:order-1 w-full overflow-hidden rounded-2xl border border-[color:var(--border-soft)]',
            'sm:flex sm:flex-col sm:gap-2 sm:overflow-visible sm:rounded-none sm:border-0 sm:mb-6',
          )}
          data-testid="empty-state-onboarding"
        >
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                'es-v2-step grid min-h-14 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 px-3 py-2.5 text-left',
                i > 0 && 'border-t',
                'sm:min-h-0 sm:flex sm:items-start sm:p-3 sm:rounded-2xl sm:border',
              )}
            >
              <div className="es-v2-step-number flex-shrink-0 size-7 sm:size-6 rounded-full grid place-items-center text-primary-foreground text-xs font-bold">
                {i + 1}
              </div>

              <div className="leading-tight">
                <div className="text-sm sm:text-[13.5px] font-semibold text-foreground">
                  {s.title}
                </div>
                <div className="text-[13px] sm:text-[12.5px] font-medium text-muted-foreground mt-0.5">
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
