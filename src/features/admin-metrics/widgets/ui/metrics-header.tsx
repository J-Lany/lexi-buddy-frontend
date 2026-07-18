import { RefreshCw } from 'lucide-react';

import { RangePreset } from '@/features/admin-metrics/lib/to-iso-range';
import { Button } from '@/shared/ui/button';

type Props = {
  rangeDays: RangePreset;
  onRangeChange: (v: RangePreset) => void;
  onRefresh: () => void;
  error: string | null;
};

export function MetricsHeader({ rangeDays, onRangeChange, onRefresh, error }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="ui-card-title">Admin Metrics</h1>
          <p className="mt-0.5 ui-meta">Product activity snapshot · {rangeDays}d range</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex rounded-xl border bg-background p-0.5 gap-0.5">
            <Button
              size="sm"
              variant={rangeDays === 7 ? 'default' : 'ghost'}
              className="h-7 px-3 text-xs"
              onClick={() => onRangeChange(7)}
            >
              7d
            </Button>
            <Button
              size="sm"
              variant={rangeDays === 30 ? 'default' : 'ghost'}
              className="h-7 px-3 text-xs"
              onClick={() => onRangeChange(30)}
            >
              30d
            </Button>
          </div>
          <Button size="icon-sm" variant="outline" onClick={onRefresh} aria-label="Refresh metrics">
            <RefreshCw className="size-3.5" />
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3">
          <div className="text-sm font-medium text-destructive">Failed to load metrics</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{error}</div>
        </div>
      ) : null}
    </div>
  );
}
