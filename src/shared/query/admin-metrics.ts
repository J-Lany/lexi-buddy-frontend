export const adminMetricsKeys = {
  all: ['admin-metrics'] as const,

  overview: (fromIso: string, toIso: string) =>
    [...adminMetricsKeys.all, 'overview', fromIso, toIso] as const,

  daily: (days: number) => [...adminMetricsKeys.all, 'daily', days] as const,
} as const;
