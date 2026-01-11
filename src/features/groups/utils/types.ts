import { EAgeGroup } from '@/lib/enums';

export type GroupDashboard = {
  group: {
    id: number;
    name: string;
    description: string | null;
    level: string | null;
    studentsCount: number;
  };

  students: GroupStudent[];

  lessons: GroupLesson[];
};

export type GroupStudent = {
  id: number;
  name: string;
  username: string | null;
  avatarUrl: string | null;
  level: string | null;
  ageGroup: EAgeGroup;
  telegramValue?: string | null;
};

export type GroupLesson = {
  id: number;
  groupId: number;
  title: string;
  topic: string | null;
  level: string | null;
  createdAt: string;
  assignmentsTotal: number;
  progress: {
    studentsTotal: number;
    studentsStarted: number;
    studentsDone: number;
    percentDone: number;
  };
};
