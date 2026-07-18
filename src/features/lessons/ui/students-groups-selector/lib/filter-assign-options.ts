import type { AssignGroupOption, AssignStudentOption } from '../model/types';
import { getStudentPrimaryLabel, getStudentSecondaryLabel } from './format-student-label';

export function excludeByIds<T extends { id: number }>(
  items: readonly T[],
  excludedIds?: readonly number[],
): T[] {
  if (!excludedIds?.length) return [...items];

  const excluded = new Set(excludedIds);
  return items.filter((item) => !excluded.has(item.id));
}

export function filterAssignStudents(
  students: readonly AssignStudentOption[],
  query: string,
): AssignStudentOption[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...students];

  return students.filter((student) => {
    const haystack = [
      student.name,
      student.username,
      getStudentPrimaryLabel(student),
      getStudentSecondaryLabel(student),
      student.level,
      String(student.id),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function filterAssignGroups(
  groups: readonly AssignGroupOption[],
  query: string,
): AssignGroupOption[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...groups];

  return groups.filter((group) => {
    const haystack = [group.name, group.level, String(group.id)]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return haystack.includes(q);
  });
}
