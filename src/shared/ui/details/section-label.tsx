import React from 'react';

import { cn } from '@/shared/lib/cn';

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('ui-meta px-1 mb-2', className)}>{children}</div>;
}
