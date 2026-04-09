import { RangePreset } from '@/features/admin-metrics/lib/to-iso-range';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

type Props = {
  rangeDays: RangePreset;
  onRangeChange: (v: RangePreset) => void;
  onRefresh: () => void;
  error: string | null;
};

export function MetricsHeader({ rangeDays, onRangeChange, onRefresh, error }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Admin Metrics</h1>
          <p className="text-sm text-muted-foreground">Product activity snapshot + 30d trend</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={rangeDays === 7 ? 'default' : 'outline'}
            onClick={() => onRangeChange(7)}
          >
            7d
          </Button>
          <Button
            variant={rangeDays === 30 ? 'default' : 'outline'}
            onClick={() => onRangeChange(30)}
          >
            30d
          </Button>
          <Button variant="outline" onClick={onRefresh}>
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <Card className="p-4 border border-destructive/40">
          <div className="font-medium">Failed to load metrics</div>
          <div className="text-sm text-muted-foreground">{error}</div>
        </Card>
      ) : null}
    </div>
  );
}
