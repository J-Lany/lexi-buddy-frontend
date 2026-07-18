import { ALL_ASSIGNMENT_TYPES, type AssignmentType } from '@/shared/domain/assignment';

export function initExpandedTypes(): Record<AssignmentType, boolean> {
  return ALL_ASSIGNMENT_TYPES.reduce(
    (acc, t) => {
      acc[t] = false;
      return acc;
    },
    {} as Record<AssignmentType, boolean>,
  );
}
