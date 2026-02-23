'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { mainNav } from '@/shared/catalogs/navigation/main-nav';
import { cn } from '@/shared/lib/cn';
import { routes } from '@/shared/router/routes';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="ui-sidebar-nav">
      <div className="ui-sidebar-list">
        {mainNav.map(({ label, href }) => {
          const isGroupPage = pathname?.startsWith('/groups') && href === routes.students;

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
