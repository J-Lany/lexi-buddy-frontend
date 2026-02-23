import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import type { AssignmentType } from '@/shared/domain/assignment/assignment-type';

type Assignment = LessonDashboardDto['assignments'][number];

export function groupAssignmentsByType(assignments: Assignment[]) {
  const map = new Map<AssignmentType, Assignment[]>();

  for (const a of assignments) {
    const key = a.type.name;
    const existing = map.get(key) ?? [];
    existing.push(a);
    map.set(key, existing);
  }

  return map;
}
