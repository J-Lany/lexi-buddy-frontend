export type CreateLessonDraft = {
  title: string;
  level: ELevel;
  topic: string;
  ageGroup: EAgeGroup;
  description?: string;
  vocabItems: VocabItem[];
  assignments: Assigment[];
  lessonId?: number;
  studentIds?: number[];
  groupIds?: number[];
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

export const ASSIGNMENT_TYPES: EAssigmentType[] = [
  EAssigmentType.DEFINITION_QUIZ,
  EAssigmentType.GAP_FILLING,
  EAssigmentType.PHRASE_FAIL,
  EAssigmentType.COLLOCATION_CHECK,
];

export const AGE_LABELS: Record<string, string> = {
  UNDER_18: 'Kids & Teens (Under 18)',
  BETWEEN_18_35: 'Young Adults (18–35)',
  OVER_35: 'Adults 35+',
};

export const AGE_SHORT_LABELS: Record<string, string> = {
  UNDER_18: 'Under 18',
  BETWEEN_18_35: '18–35',
  OVER_35: '35+',
};

export type LessonSummary = {
  id: number;
  title: string;
  topic: string | null;
  level: string | null;
  ageCategory: string | null;
  vocabCount: number;
  assignmentsCount: number;
};

export type LessonStudentStatus = 'NOT_STARTED' | 'PENDING' | 'COMPLETED';

export type LessonDetails = {
  id: number;
  title: string;
  topic: string | null;
  description: string | null;
  level: string | null;
  ageCategory: string | null;

  vocab: {
    id: number;
    term: string;
    translation: string;
    synonyms: string[];
  }[];

  assignments: {
    id: number;
    type: {
      id: number;
      name: string;
    };
    questions: {
      id: number;
      text: string;
      explanation: string | null;
      answers: {
        id: number;
        text: string;
        isCorrect: boolean;
      }[];
    }[];
  }[];

  groups: {
    id: number;
    name: string;
  }[];

  students: {
    id: number;
    username: string | null;
    status: LessonStudentStatus;
    completedAssignments: number;
    totalAssignments: number;
    progressPercent: number;
  }[];

  groupLessons?: {
    group: {
      id: number;
      name: string;
      level: string | null;
    };
  }[];
};
