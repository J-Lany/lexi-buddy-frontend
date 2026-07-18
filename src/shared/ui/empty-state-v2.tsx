'use client';

import './empty-state-v2.css';

import React from 'react';

import { cn } from '@/shared/lib/cn';

export type EmptyStateV2Step = {
  title: string;
  desc: string;
};

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
  return (
    <section
      role="status"
      aria-live="polite"
      className={cn(
        className,
        'w-full max-w-[980px] mx-auto py-2 sm:py-6',
        'flex flex-col items-center gap-6',
        'sm:flex-row sm:items-center sm:justify-center sm:gap-8',
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
          className="font-extrabold leading-tight text-2xl sm:text-[28px]"
          style={{ marginBottom: 10, letterSpacing: '-0.025em' }}
        >
          {title}
        </h2>

        <p
          className="text-[15px] leading-relaxed text-muted-foreground"
          style={{ maxWidth: '42ch', marginBottom: 18 }}
        >
          {description}
        </p>

        <div className="flex flex-col gap-2 w-full mb-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-2xl border text-left"
              style={{
                background: 'color-mix(in oklch, var(--background) 86%, white 14%)',
                borderColor: 'var(--border-soft)',
              }}
            >
              <div
                className="flex-shrink-0 w-6 h-6 rounded-full grid place-items-center text-white text-[12px] font-bold"
                style={{ background: 'color-mix(in oklch, var(--primary) 88%, white 12%)' }}
              >
                {i + 1}
              </div>

              <div className="leading-tight">
                <div className="text-[13.5px] font-semibold text-foreground">{s.title}</div>
                <div className="text-[12.5px] font-medium text-muted-foreground mt-0.5">
                  {s.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 w-full justify-center sm:justify-start">
          {primaryAction}
          {secondaryAction}
        </div>
      </div>
    </section>
  );
}
