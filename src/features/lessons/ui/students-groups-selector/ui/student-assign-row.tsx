'use client';

import { cn } from '@/shared/lib/cn';
import { StudentAvatar } from '@/shared/ui/student-avatar';

import { getStudentPrimaryLabel, getStudentSecondaryLabel } from '../lib/format-student-label';
import type { AssignStudentOption } from '../model/types';
import { AssignSelectionMark } from './assign-selection-mark';

type Props = {
  student: AssignStudentOption;
  selected: boolean;
  onToggle: () => void;
};

export function StudentAssignRow({ student, selected, onToggle }: Props) {
  const primary = getStudentPrimaryLabel(student);
  const secondary = getStudentSecondaryLabel(student);
  const level = student.level?.trim() || '—';

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

        <StudentAvatar
          username={student.username ?? primary}
          avatarUrl={student.avatarUrl ?? null}
          size={36}
        />

        <div className="min-w-0 flex-1">
          <div className="ui-title truncate">{primary}</div>
          {secondary ? <div className="ui-meta truncate">{secondary}</div> : null}
        </div>

        <span className={cn('ui-pill shrink-0', level === '—' && 'opacity-70')}>{level}</span>
      </div>
    </button>
  );
}
