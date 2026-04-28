type Props = {
  initials: string;
  title: string;
  subtitle: string;
};

export function ProfileSectionHeader({ initials, title, subtitle }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <span className="text-[18px] font-semibold text-primary">{initials}</span>
      </div>

      <div className="min-w-0">
        <div className="text-[18px] font-semibold tracking-tight truncate">{title}</div>
        <div className="ui-meta mt-0.5">{subtitle}</div>
      </div>
    </div>
  );
}
