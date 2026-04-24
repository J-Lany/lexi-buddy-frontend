import type { ReactNode } from 'react';

type Props = {
  title: string;
  selectedCount: number;
  children: ReactNode;
};

export function AssignOptionsPanel({ title, selectedCount, children }: Props) {
  return (
    <div className="ui-panel ui-radius-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
        <div className="ui-meta uppercase tracking-wide">{title}</div>
        <div className="ui-pill tabular-nums">{selectedCount} selected</div>
      </div>

      <div className="max-h-[360px] overflow-y-auto ui-scroll">{children}</div>
    </div>
  );
}
