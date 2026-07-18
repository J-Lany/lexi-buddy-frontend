'use client';

import type { AssignGroupOption } from '../model/types';
import { AssignOptionEmpty } from './assign-option-empty';
import { GroupAssignRow } from './group-assign-row';

type Props = {
  groups: AssignGroupOption[];
  selectedIds: number[];
  onToggle: (groupId: number) => void;
};

export function GroupsAssignList({ groups, selectedIds, onToggle }: Props) {
  if (groups.length === 0) {
    return <AssignOptionEmpty>No groups found</AssignOptionEmpty>;
  }

  return (
    <div className="divide-y divide-border/60">
      {groups.map((group) => (
        <GroupAssignRow
          key={group.id}
          group={group}
          selected={selectedIds.includes(group.id)}
          onToggle={() => onToggle(group.id)}
        />
      ))}
    </div>
  );
}
