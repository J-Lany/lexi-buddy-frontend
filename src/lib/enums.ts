export enum EAgeGroup {
  CHILD = 'child',
  TEENAGER = 'teenager',
  ADULT = 'adult',
}

export enum ELevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum EAssigmentType {
  DEFINITION_QUIZ = 'definition_quiz',
  GAP_FILLING = 'gap_filling',
  PHRASE_FAIL = 'phrase_fail',
  COLLOCATION_CHECK = 'collocation_check',
}

export const ASSIGNMENT_TYPES: EAssigmentType[] = [
  EAssigmentType.DEFINITION_QUIZ,
  EAssigmentType.GAP_FILLING,
  EAssigmentType.PHRASE_FAIL,
  EAssigmentType.COLLOCATION_CHECK,
];
