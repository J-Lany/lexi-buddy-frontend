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
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t sm:hidden">
      <nav className="flex justify-around items-center h-16 px-4">
        {navItemsWithIcons.map((item) => {
          const isGroupPage =
            pathname?.startsWith(EAppRoutes.GROUPS) && item.href === EAppRoutes.STUDENTS;
          const isActive = pathname?.startsWith(item.href) || isGroupPage;
          const Icon = item.IconComponent;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center justify-center p-2 transition-colors',
                isActive && 'text-primary',
              )}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
