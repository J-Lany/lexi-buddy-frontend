export function StatCell({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="ui-row rounded-2xl px-4 py-3">
      <div className="ui-meta">{label}</div>
      <div className="mt-1 text-2xl font-semibold leading-none tabular-nums">{value}</div>
    </div>
  );
}
