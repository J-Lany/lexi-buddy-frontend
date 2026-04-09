'use client';

import * as React from 'react';

import { useAdminMetricsDaily } from '@/entities/admin-metrics/model/query/use-admin-metrics-daily';
import { useAdminMetricsOverview } from '@/entities/admin-metrics/model/query/use-admin-metrics-overview';
import { RangePreset, toIsoRange } from '@/features/admin-metrics/lib/to-iso-range';
import { TypeBreakdownTable } from '@/features/admin-metrics/widgets/ui/type-breakdown/type-breakdown-table';

import { MetricsCards } from './ui/metrics-cards';
import { MetricsHeader } from './ui/metrics-header';
import { MetricsSkeleton } from './ui/metrics-skeleton';
import { MetricsTotals } from './ui/metrics-totals';
import { TrendCard } from './ui/trend-card';

function AdminMetricsWidget() {
  const [rangeDays, setRangeDays] = React.useState<RangePreset>(7);
  const [trendMode, setTrendMode] = React.useState<'started' | 'completed'>('completed');

  const { fromIso, toIso } = React.useMemo(() => toIsoRange(rangeDays), [rangeDays]);

  const overviewQ = useAdminMetricsOverview(fromIso, toIso);
  const dailyQ = useAdminMetricsDaily(30);

  const isLoading = overviewQ.isLoading || dailyQ.isLoading;
  const error = overviewQ.error?.message ?? dailyQ.error?.message ?? null;

  if (isLoading && !overviewQ.data) {
    return <MetricsSkeleton />;
  }

  return (
    <div className="space-y-4">
      <MetricsHeader
        rangeDays={rangeDays}
        onRangeChange={setRangeDays}
        onRefresh={() => {
          void overviewQ.refetch();
          void dailyQ.refetch();
        }}
        error={error}
      />

      {overviewQ.data ? (
        <>
          <MetricsCards overview={overviewQ.data} />
          <MetricsTotals totals={overviewQ.data.totals} />
          <TrendCard daily={dailyQ.data ?? null} mode={trendMode} onModeChange={setTrendMode} />
          <TypeBreakdownTable rows={overviewQ.data.byAssignmentType} />
        </>
      ) : (
        <MetricsSkeleton />
      )}
    </div>
  );
}

export default AdminMetricsWidget;
