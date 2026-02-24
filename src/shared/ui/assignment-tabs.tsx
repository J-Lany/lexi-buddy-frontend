import React from 'react';

import { ASSIGNMENT_TYPE_LABELS } from '@/shared/catalogs/assignment';
import { AssignmentType } from '@/shared/domain/assignment';
import { cn } from '@/shared/lib/cn';

type Props = {
  types: AssignmentType[];
  activeType: AssignmentType;
  onChange: (type: AssignmentType) => void;
};

export function AssignmentTabs({ types, activeType, onChange }: Props) {
  if (types.length === 0) return null;

  const activeIndex = Math.max(0, types.indexOf(activeType));
  const style = {
    ['--seg-count']: String(types.length),
    ['--seg-index']: String(activeIndex),
  } as React.CSSProperties;

  return (
    <div className="flex flex-col gap-2">
      <div className="ui-seg ui-seg--flush" style={style}>
        <span className="ui-seg-indicator" aria-hidden />

        {types.map((type) => {
          const isActive = type === activeType;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={cn(
                'ui-seg-item ui-focus',
                'text-[12px] sm:text-[13px] font-medium tracking-tight',
              )}
              data-state={isActive ? 'active' : 'inactive'}
            >
              {ASSIGNMENT_TYPE_LABELS[type]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
