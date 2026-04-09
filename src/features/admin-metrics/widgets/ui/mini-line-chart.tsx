export function MiniLineChart({ points, height = 110 }: { points: number[]; height?: number }) {
  const width = 520;
  const pad = 10;

  const max = Math.max(1, ...points);
  const min = Math.min(0, ...points);

  const step = points.length <= 1 ? 0 : (width - 2 * pad) / (points.length - 1);

  const y = (v: number) => {
    const range = max - min || 1;
    const t = (v - min) / range;
    return pad + (1 - t) * (height - 2 * pad);
  };

  const d = points
    .map((v, i) => {
      const x = pad + i * step;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y(v).toFixed(2)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
