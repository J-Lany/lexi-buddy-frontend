import { useMemo } from 'react';

import { useMyGroupsQuery } from '@/entities/groups/model/query/get-my-groups';
import { useMyStudentsQuery } from '@/entities/students/model/queries/get-my-students';
import { Level } from '@/shared/domain/common';

export type StudentAssigneeOption = {
  id: number;
  username: string;
  level: Level | null;
};

export type GroupAssigneeOption = {
  id: number;
  name: string;
  level: Level | null;
};

type Options = {
  enabled?: boolean;
};

export function useAssigneesOptionsQuery(options?: Options) {
  const studentsQuery = useMyStudentsQuery({ enabled: options?.enabled });
  const groupsQuery = useMyGroupsQuery({ enabled: options?.enabled });

  const students = useMemo<StudentAssigneeOption[]>(
    () =>
      (studentsQuery.data ?? []).map((s) => ({
        id: s.id,
        username: s.username,
        level: s.level,
      })),
    [studentsQuery.data],
  );

  const groups = useMemo<GroupAssigneeOption[]>(
    () =>
      (groupsQuery.data ?? []).map((g) => ({
        id: g.id,
        name: g.name,
        level: g.level,
      })),
    [groupsQuery.data],
  );

  const isLoading = studentsQuery.isLoading || groupsQuery.isLoading;
  const isError = studentsQuery.isError || groupsQuery.isError;

  return {
    students,
    groups,
    isLoading,
    isError,
  };
}
