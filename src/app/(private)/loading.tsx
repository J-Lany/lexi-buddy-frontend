function Bone({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-foreground/5 ${className}`} />;
}

export default function PrivateLoading() {
  return (
    <div className="space-y-4">
      <Bone className="h-8 w-48" />
      <div className="space-y-3">
        <Bone className="h-16 w-full" />
        <Bone className="h-16 w-full" />
        <Bone className="h-16 w-full" />
        <Bone className="h-16 w-full opacity-60" />
        <Bone className="h-16 w-full opacity-30" />
      </div>
    </div>
  );
}
