'use client';

import { useMemo, useState } from 'react';

import { toggleId } from '@/features/lessons/ui/students-groups-selector/lib/toggle-id';

import {
  excludeByIds,
  filterAssignGroups,
  filterAssignStudents,
} from './lib/filter-assign-options';
import type { AssignGroupOption, AssignStudentOption, AssignTargetTab } from './model/types';
import { AssignOptionsPanel } from './ui/assign-options-panel';
import { AssignSelectorToolbar } from './ui/assign-selector-toolbar';
import { GroupsAssignList } from './ui/groups-assign-list';
import { StudentsAssignList } from './ui/students-assign-list';

type Props = {
  students: AssignStudentOption[];
  groups: AssignGroupOption[];

  selectedStudentIds: number[];
  selectedGroupIds: number[];

  onChangeStudentIds: (ids: number[]) => void;
  onChangeGroupIds: (ids: number[]) => void;

  excludeStudentIds?: number[];
  excludeGroupIds?: number[];
};

export function StudentsGroupsSelector({
  students,
  groups,
  selectedStudentIds,
  selectedGroupIds,
  onChangeStudentIds,
  onChangeGroupIds,
  excludeStudentIds,
  excludeGroupIds,
}: Props) {
  const [tab, setTab] = useState<AssignTargetTab>('students');
  const [query, setQuery] = useState('');

  const availableStudents = useMemo(() => {
    return excludeByIds(students, excludeStudentIds);
  }, [students, excludeStudentIds]);

  const availableGroups = useMemo(() => {
    return excludeByIds(groups, excludeGroupIds);
  }, [groups, excludeGroupIds]);

  const filteredStudents = useMemo(() => {
    return filterAssignStudents(availableStudents, query);
  }, [availableStudents, query]);

  const filteredGroups = useMemo(() => {
    return filterAssignGroups(availableGroups, query);
  }, [availableGroups, query]);

  const toggleStudent = (studentId: number) => {
    onChangeStudentIds(toggleId(selectedStudentIds, studentId));
  };

  const toggleGroup = (groupId: number) => {
    onChangeGroupIds(toggleId(selectedGroupIds, groupId));
  };

  const handleTabChange = (nextTab: AssignTargetTab) => {
    setTab(nextTab);
    setQuery('');
  };

  const isStudentsTab = tab === 'students';

  return (
    <div className="grid gap-4">
      <AssignSelectorToolbar
        tab={tab}
        query={query}
        selectedStudentsCount={selectedStudentIds.length}
        selectedGroupsCount={selectedGroupIds.length}
        onTabChange={handleTabChange}
        onQueryChange={setQuery}
      />

      <AssignOptionsPanel
        title={isStudentsTab ? 'Students' : 'Groups'}
        selectedCount={isStudentsTab ? selectedStudentIds.length : selectedGroupIds.length}
      >
        {isStudentsTab ? (
          <StudentsAssignList
            students={filteredStudents}
            selectedIds={selectedStudentIds}
            onToggle={toggleStudent}
          />
        ) : (
          <GroupsAssignList
            groups={filteredGroups}
            selectedIds={selectedGroupIds}
            onToggle={toggleGroup}
          />
        )}
      </AssignOptionsPanel>
    </div>
  );
}
