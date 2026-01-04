'use client';

import Link from 'next/link';
import { BookOpen, HelpCircle, Settings, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { EAppRoutes, RoutesLabels } from '@/lib/routes';
import { cn } from '@/lib/utils';

const navItemsWithIcons = RoutesLabels.map((item) => {
  let IconComponent;
  switch (item.href) {
    case EAppRoutes.STUDENTS:
      IconComponent = Users;
      break;
    case EAppRoutes.LESSONS:
      IconComponent = BookOpen;
      break;
    case EAppRoutes.PROFILE:
      IconComponent = Settings;
      break;
    case EAppRoutes.QA:
      IconComponent = HelpCircle;
      break;
    default:
      IconComponent = HelpCircle;
  }
  return { ...item, IconComponent };
});

export function MobileFooter() {
  const pathname = usePathname();

  return (
    <footer
      className={cn('fixed inset-x-0 bottom-0 z-50 sm:hidden', 'back-gradient/50 backdrop-blur-xl')}
    >
      <nav
        className={cn(
          'mx-auto flex h-14 items-center justify-around px-2',
          'pb-[env(safe-area-inset-bottom)]',
        )}
        aria-label="Bottom navigation"
      >
        {navItemsWithIcons.map((item) => {
          const isGroupPage =
            pathname?.startsWith(EAppRoutes.GROUPS) && item.href === EAppRoutes.STUDENTS;
          const isActive = pathname?.startsWith(item.href) || isGroupPage;
          const Icon = item.IconComponent;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative flex h-11 w-16 items-center justify-center rounded-2xl',
                'transition-[background-color,color,opacity] duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive ? 'text-foreground' : 'text-muted-foreground/80 hover:text-foreground',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute inset-1 rounded-2xl',
                  'bg-foreground/5',
                  'transition-all duration-200 ease-out',
                  isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
                )}
              />

              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className={cn(
                  'relative z-10 size-[22px]',
                  'transition-[transform,opacity] duration-200 ease-out',
                  isActive
                    ? 'opacity-100 scale-[1.06]'
                    : 'opacity-70 scale-100 group-hover:opacity-90',
                )}
              />
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
