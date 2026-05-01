'use client';

import * as React from 'react';

import { useAdminMetricsDaily } from '@/entities/admin-metrics/model/query/use-admin-metrics-daily';
import { useAdminMetricsOverview } from '@/entities/admin-metrics/model/query/use-admin-metrics-overview';
import { RangePreset, toIsoRange } from '@/features/admin-metrics/lib/to-iso-range';

import { ActivityChart } from './ui/activity-chart';
import { HeroKpiCards } from './ui/hero-kpi-cards';
import { MetricsHeader } from './ui/metrics-header';
import { MetricsSkeleton } from './ui/metrics-skeleton';
import { StudentEngagementPanel } from './ui/student-engagement-panel';
import { TeacherActivityStrip } from './ui/teacher-activity-strip';
import { TypeBreakdownTable } from './ui/type-breakdown/type-breakdown-table';

function AdminMetricsWidget() {
  const [rangeDays, setRangeDays] = React.useState<RangePreset>(7);

  const { fromIso, toIso } = React.useMemo(() => toIsoRange(rangeDays), [rangeDays]);

  const overviewQ = useAdminMetricsOverview(fromIso, toIso);
  const dailyQ = useAdminMetricsDaily(rangeDays);

  const isLoading = overviewQ.isLoading || dailyQ.isLoading;
  const error = overviewQ.error?.message ?? dailyQ.error?.message ?? null;

  const handleRefresh = () => {
    void overviewQ.refetch();
    void dailyQ.refetch();
  };

  return (
    <div className="space-y-4">
      <MetricsHeader
        rangeDays={rangeDays}
        onRangeChange={setRangeDays}
        onRefresh={handleRefresh}
        error={error}
      />

      {isLoading && !overviewQ.data ? (
        <MetricsSkeleton />
      ) : overviewQ.data ? (
        <>
          {/* Row 1: 4 primary KPIs */}
          <HeroKpiCards overview={overviewQ.data} daily={dailyQ.data ?? null} />

          {/* Row 2: Activity chart (2/3) + Student engagement panel (1/3) */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ActivityChart daily={dailyQ.data ?? null} rangeDays={rangeDays} />
            </div>
            <StudentEngagementPanel students={overviewQ.data.students} />
          </div>

          {/* Row 3: Teacher activity strip */}
          <TeacherActivityStrip teachers={overviewQ.data.teachers} />

          {/* Row 4: Assignment type breakdown (sortable, with sparklines) */}
          <TypeBreakdownTable
            rows={overviewQ.data.byAssignmentType}
            byAssignmentTypeSeries={dailyQ.data?.byAssignmentTypeSeries ?? []}
          />
        </>
      ) : (
        <MetricsSkeleton />
      )}
    </div>
  );
}

export default AdminMetricsWidget;
