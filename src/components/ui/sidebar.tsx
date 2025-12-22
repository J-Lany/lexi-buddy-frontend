'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EAppRoutes, RoutesLabels } from '@/lib/routes';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6  p-6">
      {RoutesLabels.map(({ label, href }) => {
        const isGroupPage = pathname?.startsWith(EAppRoutes.GROUPS) && href === EAppRoutes.STUDENTS;
        const isActive = pathname?.startsWith(href) || isGroupPage;
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
