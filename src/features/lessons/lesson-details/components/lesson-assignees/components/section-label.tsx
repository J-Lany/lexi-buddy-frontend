import React from 'react';

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
      {children}
    </div>
  );
}
