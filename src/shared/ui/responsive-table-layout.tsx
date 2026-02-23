'use client';

import type { ReactNode } from 'react';

type Props = {
  header: ReactNode;
  desktopBody: ReactNode;
  mobileBody: ReactNode;
  maxHeightClassName?: string;
};

export function ResponsiveTableLayout({
  header,
  desktopBody,
  mobileBody,
  maxHeightClassName = 'sm:max-h-[calc(90dvh-220px)]',
}: Props) {
  return (
    <div className="grid gap-3">
      <div className="hidden sm:block">
        <div className="ui-panel overflow-hidden">
          <div className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="px-6 py-3">{header}</div>
          </div>
          <div
            className={`divide-y divide-border/60 overflow-y-auto ui-scroll ${maxHeightClassName}`}
          >
            {desktopBody}
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:hidden">{mobileBody}</div>
    </div>
  );
}
