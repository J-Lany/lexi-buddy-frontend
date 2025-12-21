export type StudentDashboard = {
  student: {
    id: number;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    level: string | null;
    ageGroup: string | null;
    lastVisit: string | null;
    createdAt: string;
    telegramValue: string | null;
  };
  groups: Array<{
    id: number;
    name: string;
    level: string | null;
    joinedAt: string;
  }>;
  stats: {
    lessonsTotal: number;
    assignmentsTotal: number;
    assignmentsDone: number;
    progressPercent: number;
    avgScore: number | null;
    lastSubmittedAt: string | null;
  };
  lessons: Array<{
    id: number;
    groupId: number;
    title: string;
    level: string | null;
    topic: string | null;
    createdAt: string;
    archived: boolean;
    progress: {
      assignmentsTotal: number;
      assignmentsDone: number;
      percent: number;
      avgScore: number | null;
      lastSubmittedAt: string | null;
    };
  }>;
};
