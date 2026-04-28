import { api, GroupPreviewDto, IsoDateString, StudentIdentityDto } from '@/shared/api';
import { AssignmentType } from '@/shared/domain/assignment';
import type { AgeGroup, Level } from '@/shared/domain/common';
import type { InstructionLanguage } from '@/shared/domain/instruction-language';
import type { Language } from '@/shared/domain/language';

export type LessonStudentStatus = 'NOT_STARTED' | 'PENDING' | 'COMPLETED';

export type LessonVocabDto = {
  id: number;
  term: string;
  translation: string | null;
  synonyms: string[] | null;
};

export type LessonAnswerDto = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export type LessonQuestionDto = {
  id: number;
  text: string;
  explanation: string | null;
  answers: LessonAnswerDto[];
};

export type LessonAssignmentTypeDto = {
  id: number;
  name: AssignmentType;
};

export type LessonAssignmentDto = {
  id: number;
  type: LessonAssignmentTypeDto;
  questions: LessonQuestionDto[];
};

export type LessonStudentDto = StudentIdentityDto & {
  lastVisit: IsoDateString | null;
  status: LessonStudentStatus;
  completedAssignments: number;
  totalAssignments: number;
  progressPercent: number;
};

export type LessonDashboardDto = {
  id: number;
  title: string;
  topic: string | null;
  description: string | null;
  level: Level | null;
  ageCategory: AgeGroup | null;
  targetLanguage: Language | null;
  nativeLanguage: Language | null;
  instructionLanguage: InstructionLanguage | null;

  vocab: LessonVocabDto[];
  assignments: LessonAssignmentDto[];

  groups: GroupPreviewDto[];
  students: LessonStudentDto[];
};
export async function getLessonDashboard(lessonId: number): Promise<LessonDashboardDto> {
  const { data } = await api.get<LessonDashboardDto>(`/lessons/${lessonId}`);
  return data;
}
