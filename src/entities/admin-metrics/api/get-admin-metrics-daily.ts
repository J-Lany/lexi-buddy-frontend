import { api } from '@/shared/api/http/api';

export type GetAdminMetricsDailyParams = {
  days?: number;
};

export type DauWauMau = { dau: number; wau: number; mau: number };

export type AdminMetricsDailyResponseDto = {
  range: { days: number; timezone: string };
  series: Array<{
    date: string;
    lessonsCreated: number;
    assignmentsAssigned: number;
    attemptsStarted: number;
    attemptsCompleted: number;
    uniqueStudentsStarted: number;
    uniqueStudentsCompleted: number;
  }>;
  byAssignmentTypeSeries: Array<{
    type: string;
    points: Array<{ date: string; attemptsStarted: number; attemptsCompleted: number }>;
  }>;
};

export async function getAdminMetricsDaily(params: GetAdminMetricsDailyParams = {}) {
  const res = await api.get<AdminMetricsDailyResponseDto>(`/admin/metrics/daily`, { params });
  return res.data;
}
