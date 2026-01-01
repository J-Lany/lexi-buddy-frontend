type StatTileProps = {
  label: string;
  value: number | string;
};

export function StatTile({ label, value }: StatTileProps) {
  return (
    <div
      className="
        flex h-24 flex-col justify-between rounded-3xl
        border border-sky-100 bg-white/90 px-4 py-3
        shadow-[0_6px_18px_rgba(15,116,143,0.08)]
      "
    >
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
