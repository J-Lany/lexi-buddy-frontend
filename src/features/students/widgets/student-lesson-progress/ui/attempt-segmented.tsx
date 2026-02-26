import { cn } from '@/shared/lib/cn';

export function AttemptSegmented({
  attempts,
  value,
  onChange,
}: {
  attempts: number[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <div className="inline-flex rounded-2xl border border-border/30 bg-muted/[0.15] p-1 gap-1">
        {attempts.map((n) => {
          const active = n === value;

          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={cn(
                'ui-focus shrink-0 rounded-xl px-3 h-9 text-[13px] font-medium transition-colors',
                active ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              Attempt {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
