'use client';

import { useGetStudents } from '@/features/students/hooks/use-get-students';
import { useGetGroups } from '@/features/groups/hooks/use-get-groups';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type StudentsGroupsSelectorProps = {
  selectedStudentIds: number[];
  selectedGroupIds: number[];
  onChangeStudentIds: (ids: number[]) => void;
  onChangeGroupIds: (ids: number[]) => void;
  selectedBeforeStudents?: number[];
  selectedBeforeGroups?: number[];
};

export function StudentsGroupsSelector({
  selectedStudentIds,
  selectedGroupIds,
  onChangeStudentIds,
  onChangeGroupIds,
  selectedBeforeGroups,
  selectedBeforeStudents,
}: StudentsGroupsSelectorProps) {
  const { data: students } = useGetStudents();
  const { data: groups } = useGetGroups();

  const toggleStudent = (id: number) => {
    if (selectedStudentIds.includes(id)) {
      onChangeStudentIds(selectedStudentIds.filter((x) => x !== id));
    } else {
      onChangeStudentIds([...selectedStudentIds, id]);
    }
  };

  const toggleGroup = (id: number) => {
    if (selectedGroupIds.includes(id)) {
      onChangeGroupIds(selectedGroupIds.filter((x) => x !== id));
    } else {
      onChangeGroupIds([...selectedGroupIds, id]);
    }
  };

  const studentsToChoise = selectedBeforeStudents
    ? students?.filter((s) => !selectedBeforeStudents?.includes(s.id))
    : students;
  const groupToChoise = selectedBeforeGroups
    ? groups?.filter((g) => !selectedBeforeGroups?.includes(g.id))
    : groups;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <div className="text-sm font-medium">Students</div>
        <div className="max-h-60 overflow-y-auto space-y-1 rounded-xl border px-3 py-2">
          {studentsToChoise && studentsToChoise.length > 0 ? (
            studentsToChoise.map((s) => (
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
          {groupToChoise && groupToChoise.length > 0 ? (
            groupToChoise.map((g) => (
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
