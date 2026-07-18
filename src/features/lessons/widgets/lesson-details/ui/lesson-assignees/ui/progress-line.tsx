export function ProgressLine({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value || 0));

  return (
    <div
      className="mt-2 h-1 w-full rounded-full overflow-hidden"
      style={{ background: 'color-mix(in oklch, var(--primary) 12%, white 88%)' }}
      aria-label={`Progress ${v}%`}
    >
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${v}%`,
          background:
            v === 0 ? 'transparent' : 'color-mix(in oklch, var(--primary) 75%, white 25%)',
        }}
      />
    </div>
  );
}
