'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EAppRoutes, RoutesLabels } from '@/lib/routes';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="ui-sidebar-nav">
      <div className="ui-sidebar-list">
        {RoutesLabels.map(({ label, href }) => {
          const isGroupPage =
            pathname?.startsWith(EAppRoutes.GROUPS) && href === EAppRoutes.STUDENTS;

          const isActive = pathname?.startsWith(href) || isGroupPage;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn('ui-sidebar-item ui-focus', isActive && 'ui-sidebar-item-active')}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
