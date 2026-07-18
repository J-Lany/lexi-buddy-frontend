export const assignmentType = {
  DEFINITION_QUIZ: 'definition_quiz',
  GAP_FILLING: 'gap_filling',
  PHRASE_FAIL: 'phrase_fail',
  COLLOCATION_CHECK: 'collocation_check',
} as const;

export type AssignmentType = (typeof assignmentType)[keyof typeof assignmentType];

export const ALL_ASSIGNMENT_TYPES: readonly AssignmentType[] = Object.values(assignmentType);
