import { DauWauMau } from '@/entities/admin-metrics/api/get-admin-metrics-daily';
import { api } from '@/shared/api/http/api';

export type GetAdminMetricsOverviewParams = {
  from: string;
  to: string;
};

export type AdminMetricsOverviewResponseDto = {
  range: { from: string; to: string; timezone: string };
  teachers: DauWauMau;
  students: { started: DauWauMau; completed: DauWauMau };
  totals: {
    lessonsCreated: number;
    assignmentsAssigned: number;
    assignmentAttemptsStarted: number;
    assignmentAttemptsCompleted: number;
    attemptCompletionRate: number;
    totalRegisteredStudents: number;
    totalRegisteredTeachers: number;
  };
  byAssignmentType: Array<{
    type: string;
    attemptsStarted: number;
    attemptsCompleted: number;
    completionRate: number;
  }>;
  definitions: Record<string, string>;
};

export async function getAdminMetricsOverview(params: GetAdminMetricsOverviewParams) {
  const res = await api.get<AdminMetricsOverviewResponseDto>(`/admin/metrics/overview`, { params });
  return res.data;
}
