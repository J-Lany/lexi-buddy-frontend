export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-muted shrink-0" />
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="h-3 w-48 rounded bg-muted" />
        </div>
      </div>
      <div className="h-10 rounded-xl bg-muted" />
    </div>
  );
}
