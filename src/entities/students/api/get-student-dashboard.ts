import { api, GroupPreviewDto, IsoDateString, StudentIdentityDto } from '@/shared/api';
import type { AgeGroup, Level } from '@/shared/domain/common';

export type StudentLessonProgressDto = {
  assignmentsTotal: number;
  assignmentsDone: number;
  percent: number;
  avgScore: number | null;
  lastSubmittedAt: IsoDateString | null;
};

export type StudentLessonDto = {
  id: number;
  groupId: number | null;
  title: string;
  level: Level | null;
  topic: string | null;
  createdAt: IsoDateString;
  archived: boolean;
  progress: StudentLessonProgressDto;
};

export type StudentDashboardStudentDto = StudentIdentityDto & {
  level: Level | null;
  ageGroup: AgeGroup | null;
  lastVisit: IsoDateString | null;
  createdAt: IsoDateString;
  telegramValue: string | null;
};

export type StudentDashboardStatsDto = {
  lessonsTotal: number;
  assignmentsTotal: number;
  assignmentsDone: number;
  progressPercent: number;
  avgScore: number | null;
  lastSubmittedAt: IsoDateString | null;
};

export type StudentDashboardGroupDto = GroupPreviewDto & {
  level: Level | null;
};

export type StudentDashboardDto = {
  student: StudentDashboardStudentDto;
  groups: StudentDashboardGroupDto[];
  stats: StudentDashboardStatsDto;
  lessons: StudentLessonDto[];
};

export async function getStudentDashboard(studentId: number): Promise<StudentDashboardDto> {
  const { data } = await api.get<StudentDashboardDto>(`/students/${studentId}/dashboard`);
  return data;
}
