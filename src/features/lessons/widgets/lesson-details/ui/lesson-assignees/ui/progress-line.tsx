export function ProgressLine({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value || 0));

  return (
    <div
      className="mt-2 h-1.5 w-full rounded-full border"
      style={{
        background: 'color-mix(in oklch, var(--background) 92%, white 8%)',
        borderColor: 'var(--border-soft)',
      }}
      aria-label={`Progress ${v}%`}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${v}%`,
          background: 'color-mix(in oklch, var(--primary) 60%, white 40%)',
        }}
      />
    </div>
  );
}
