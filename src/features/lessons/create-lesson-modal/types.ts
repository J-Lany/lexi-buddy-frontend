export type CreateLessonDraft = {
  title: string;
  level: ELevel;
  topic: string;
  ageGroup: EAgeGroup;
  description?: string;
  vocabItems: VocabItem[];
  assignments: Assigment[];
};

export type VocabItem = {
  term: string;
  translation: string;
  synonyms?: string[];
};

export type Assigment = {
  type: EAssigmentType;
  terms: string[];
  level: ELevel;
  topic: string;
  ageGroup: EAgeGroup;
};

export type TAnswer = {
  text: string;
  isCorrect: boolean;
};

export type TAssignment = {
  question: string;
  questionType: 'multiple_choice' | 'gap_fill' | 'open_text';
  answers: TAnswer[];
  explanation: string;
  assignmentType: EAssigmentType;
};

export enum ELevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum EAgeGroup {
  UNDER_18 = 'UNDER_18',
  BETWEEN_18_35 = 'BETWEEN_18_35',
  OVER_35 = 'OVER_35',
}

export enum EAssigmentType {
  DEFINITION_QUIZ = 'definition_quiz',
  GAP_FILLING = 'gap_filling',
  PHRASE_FAIL = 'phrase_fail',
  COLLOCATION_CHECK = 'collocation_check',
}
