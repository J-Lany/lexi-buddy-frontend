'use client';

import { Users } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

import type { AssignGroupOption } from '../model/types';
import { AssignSelectionMark } from './assign-selection-mark';

type Props = {
  group: AssignGroupOption;
  selected: boolean;
  onToggle: () => void;
};

export function GroupAssignRow({ group, selected, onToggle }: Props) {
  const level = group.level?.trim() || '—';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        'w-full px-4 py-3.5 text-left transition-colors',
        'hover:bg-muted/30',
        selected && 'bg-info-soft',
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <AssignSelectionMark selected={selected} />

        <div className="ui-thumb h-9 w-9">
          <Users size={18} strokeWidth={2} className="text-primary" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="ui-title truncate">{group.name}</div>
          <div className="ui-meta truncate">Group</div>
        </div>

        <span className={cn('ui-pill shrink-0', level === '—' && 'opacity-70')}>{level}</span>
      </div>
    </button>
  );
}
