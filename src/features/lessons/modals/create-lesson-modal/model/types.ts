import { AssignmentPreviewDto } from '@/entities/lessons/api/create-assignments-preview';
import type { VocabItemDto } from '@/shared/api';
import { AssignmentType } from '@/shared/domain/assignment';
import type { AgeGroup, Level } from '@/shared/domain/common';
import type { InstructionLanguage } from '@/shared/domain/instruction-language';
import type { Language } from '@/shared/domain/language';

export type CreateLessonDraft = {
  title: string;
  level: Level;
  topic?: string;
  ageCategory: AgeGroup;
  description: string;
  targetLanguage: Language;
  nativeLanguage: Language;
  instructionLanguage: InstructionLanguage;

  vocabItems: VocabItemDto[];
  assignments: AssignmentPreviewDto[];

  studentIds: number[];
  groupIds: number[];

  lessonId?: number;
};

export type DraftPatch = Partial<CreateLessonDraft>;

export type GeneratedAssignments = Partial<Record<AssignmentType, AssignmentPreviewDto[]>>;
