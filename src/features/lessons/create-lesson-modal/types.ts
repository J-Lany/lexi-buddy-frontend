import { EAgeGroup, EAssigmentType, ELevel } from '@/lib/enums';

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
