'use client';

import { useMemo } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';

export type StudentOption = {
  id: number;
  username: string;
  level: string | null;
};

export type GroupOption = {
  id: number;
  name: string;
  level: string | null;
};

type Props = {
  students: StudentOption[];
  groups: GroupOption[];

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
  const studentsToChoose = useMemo(() => {
    if (!excludeStudentIds?.length) return students;
    const excluded = new Set(excludeStudentIds);
    return students.filter((s) => !excluded.has(s.id));
  }, [students, excludeStudentIds]);

  const groupsToChoose = useMemo(() => {
    if (!excludeGroupIds?.length) return groups;
    const excluded = new Set(excludeGroupIds);
    return groups.filter((g) => !excluded.has(g.id));
  }, [groups, excludeGroupIds]);

  const toggleStudent = (id: number) => {
    onChangeStudentIds(
      selectedStudentIds.includes(id)
        ? selectedStudentIds.filter((x) => x !== id)
        : [...selectedStudentIds, id],
    );
  };

  const toggleGroup = (id: number) => {
    onChangeGroupIds(
      selectedGroupIds.includes(id)
        ? selectedGroupIds.filter((x) => x !== id)
        : [...selectedGroupIds, id],
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <div className="text-sm font-medium">Students</div>
        <div className="max-h-60 overflow-y-auto space-y-1 rounded-xl border px-3 py-2">
          {studentsToChoose.length > 0 ? (
            studentsToChoose.map((s) => (
              <Label key={s.id} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                <Checkbox
                  checked={selectedStudentIds.includes(s.id)}
                  onCheckedChange={() => toggleStudent(s.id)}
                />
                <span className="truncate">
                  {s.username}
                  {s.level ? (
                    <span className="text-xs text-muted-foreground"> · {s.level}</span>
                  ) : null}
                </span>
              </Label>
            ))
          ) : (
            <div className="text-xs text-muted-foreground">No students</div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">Groups</div>
        <div className="max-h-60 overflow-y-auto space-y-1 rounded-xl border px-3 py-2">
          {groupsToChoose.length > 0 ? (
            groupsToChoose.map((g) => (
              <Label key={g.id} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
                <Checkbox
                  checked={selectedGroupIds.includes(g.id)}
                  onCheckedChange={() => toggleGroup(g.id)}
                />
                <span className="truncate">
                  {g.name}
                  {g.level ? (
                    <span className="text-xs text-muted-foreground"> · {g.level}</span>
                  ) : null}
                </span>
              </Label>
            ))
          ) : (
            <div className="text-xs text-muted-foreground">No groups</div>
          )}
        </div>
      </div>
    </div>
  );
}
