'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RoutesLabels } from '@/lib/routes';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6  p-6">
      {RoutesLabels.map(({ label, href }) => {
        const isActive = pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn('px-6 font-semibold text-l', isActive && 'text-primary')}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
