import { api, IsoDateString } from '@/shared/api';
import type { Level } from '@/shared/domain/common';

export type GroupStudent = {
  id: number;
  name: string;
  username: string;
  level: Level;
  avatarUrl: string;
  telegramValue: string;
};

export type GroupLesson = {
  id: number;
  groupId: number;
  title: string;
  topic: string;
  level: Level;
  createdAt: IsoDateString;
  assignmentsTotal: number;
  progress: {
    studentsTotal: number;
    studentsStarted: number;
    studentsDone: number;
    percentDone: number;
  };
};

export type GroupDashboardDto = {
  group: {
    id: number;
    name: string;
    description: string;
    level: Level;
    studentsCount: number;
  };

  students: GroupStudent[];

  lessons: GroupLesson[];
};
export async function getGroupDashboard(groupId: number): Promise<GroupDashboardDto> {
  const { data } = await api.get<GroupDashboardDto>(`/groups/${groupId}/dashboard`);
  return data;
}
