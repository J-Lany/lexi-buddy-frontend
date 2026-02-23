'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function RowLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'block px-6 py-4 transition-colors',
        'hover:bg-[color-mix(in_oklch,var(--foreground)_3%,white_97%)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      {children}
    </Link>
  );
}
