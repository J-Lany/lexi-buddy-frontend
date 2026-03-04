'use client';

import React, { useEffect, useMemo } from 'react';

import { ASSIGNMENT_TYPE_LABELS } from '@/shared/catalogs/assignment';
import type { AssignmentType } from '@/shared/domain/assignment';
import { cn } from '@/shared/lib/cn';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

type Props = {
  types: AssignmentType[];
  activeType: AssignmentType;
  onChange: (type: AssignmentType) => void;
  className?: string;
};

type TabOption = {
  value: AssignmentType;
  label: string;
};

export function AssignmentTabs({ types, activeType, onChange, className }: Props) {
  const options = useMemo<TabOption[]>(
    () => types.map((t) => ({ value: t, label: ASSIGNMENT_TYPE_LABELS[t] })),
    [types],
  );

  const safeActive = useMemo<AssignmentType | undefined>(() => {
    if (types.length === 0) return undefined;
    return types.includes(activeType) ? activeType : types[0];
  }, [types, activeType]);

  useEffect(() => {
    if (!safeActive) return;
    if (safeActive !== activeType) onChange(safeActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeActive]);

  if (options.length <= 1 || !safeActive) return null;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <AssignmentTabsMobileSelect options={options} value={safeActive} onChange={onChange} />
      <AssignmentTabsDesktopSegmented options={options} value={safeActive} onChange={onChange} />
    </div>
  );
}

function AssignmentTabsMobileSelect({
  options,
  value,
  onChange,
}: {
  options: TabOption[];
  value: AssignmentType;
  onChange: (t: AssignmentType) => void;
}) {
  return (
    <div className="sm:hidden">
      <Select value={value} onValueChange={(v) => onChange(v as AssignmentType)}>
        <SelectTrigger aria-label="Assignment type" className="h-10 rounded-xl text-[14px]">
          <SelectValue placeholder="Assignment type" />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function AssignmentTabsDesktopSegmented({
  options,
  value,
  onChange,
}: {
  options: TabOption[];
  value: AssignmentType;
  onChange: (t: AssignmentType) => void;
}) {
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const style = {
    ['--seg-count']: String(options.length),
    ['--seg-index']: String(activeIndex),
  } as React.CSSProperties;

  return (
    <div className="hidden sm:block">
      <div className="ui-seg ui-seg--flush" style={style}>
        <span className="ui-seg-indicator" aria-hidden />
        {options.map((opt) => {
          const isActive = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                'ui-seg-item ui-focus',
                'text-[12px] sm:text-[13px] font-medium tracking-tight',
              )}
              data-state={isActive ? 'active' : 'inactive'}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
