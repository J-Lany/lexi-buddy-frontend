'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type SegmentedOption<T extends string | number> = {
  value: T;
  label: string;
};

export function SegmentedControl<T extends string | number>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: readonly SegmentedOption<T>[];
  className?: string;
}) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  const style = {
    // CSS vars for indicator positioning
    ['--seg-count']: options.length,
    ['--seg-index']: selectedIndex,
  } as React.CSSProperties;

  return (
    <div
      className={cn('ui-seg', className)}
      style={style}
      role="tablist"
      aria-label="Students tabs"
    >
      <div className="ui-seg-indicator" aria-hidden />

      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            data-state={active ? 'active' : 'inactive'}
            className="ui-seg-item"
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
