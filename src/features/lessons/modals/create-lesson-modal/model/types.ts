import { AssignmentPreviewDto } from '@/entities/lessons/api/create-assignments-preview';
import type { VocabItemDto } from '@/shared/api';
import { AssignmentType } from '@/shared/domain/assignment';
import type { AgeGroup, Level } from '@/shared/domain/common';

export type CreateLessonDraft = {
  title: string;
  level: Level;
  topic: string;
  ageCategory: AgeGroup;
  description: string;

  vocabItems: VocabItemDto[];
  assignments: AssignmentPreviewDto[];

  studentIds: number[];
  groupIds: number[];

  lessonId?: number;
};

export type DraftPatch = Partial<CreateLessonDraft>;

export type GeneratedAssignments = Partial<Record<AssignmentType, AssignmentPreviewDto[]>>;
