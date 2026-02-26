export function MetaPair({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="tabular-nums">
      <span className="ui-meta">{label}:</span>{' '}
      <span className="ui-meta !text-foreground">{value}</span>
    </span>
  );
}
