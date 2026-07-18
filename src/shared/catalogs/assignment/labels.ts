import type { AssignmentType } from '@/shared/domain/assignment/assignment-type';

export const ASSIGNMENT_TYPE_LABELS: Record<AssignmentType, string> = {
  definition_quiz: 'Definition quiz',
  gap_filling: 'Gap filling',
  phrase_fail: 'Phrase fail',
  collocation_check: 'Collocation check',
};
