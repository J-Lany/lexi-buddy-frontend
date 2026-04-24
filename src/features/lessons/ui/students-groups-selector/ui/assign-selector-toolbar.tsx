'use client';

import { Input } from '@/shared/ui/input';
import { SegmentedControl } from '@/shared/ui/segmented-control';

import { ASSIGN_TARGET_TABS } from '../model/tabs';
import type { AssignTargetTab } from '../model/types';

type Props = {
  tab: AssignTargetTab;
  query: string;
  selectedStudentsCount: number;
  selectedGroupsCount: number;
  onTabChange: (tab: AssignTargetTab) => void;
  onQueryChange: (query: string) => void;
};

export function AssignSelectorToolbar({
  tab,
  query,
  selectedStudentsCount,
  selectedGroupsCount,
  onTabChange,
  onQueryChange,
}: Props) {
  const totalSelected = selectedStudentsCount + selectedGroupsCount;

  return (
    <div className="ui-panel ui-radius-card p-3 sm:p-4">
      <div className="flex flex-col gap-3">
        <SegmentedControl<AssignTargetTab>
          value={tab}
          onChange={onTabChange}
          options={ASSIGN_TARGET_TABS}
          className="w-full"
        />

        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={tab === 'students' ? 'Search students' : 'Search groups'}
          className="h-11 rounded-2xl"
        />

        {totalSelected > 0 ? (
          <div className="ui-meta px-1">
            Selected: {selectedStudentsCount} students · {selectedGroupsCount} groups
          </div>
        ) : null}
      </div>
    </div>
  );
}
