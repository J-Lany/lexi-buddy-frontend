'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { mainNav } from '@/shared/catalogs/navigation/main-nav';
import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';

export function MobileFooter() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <footer
      className={cn('fixed inset-x-0 bottom-0 z-50 sm:hidden', 'back-gradient/50 backdrop-blur-xl')}
    >
      <nav
        className={cn(
          'mx-auto flex h-16 items-center justify-around px-2',
          'pb-[env(safe-area-inset-bottom)]',
        )}
        aria-label="Bottom navigation"
      >
        {mainNav.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;
          const label = t(item.labelKey) || item.label;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative flex flex-col items-center justify-center gap-0.5',
                'h-full min-w-[56px] px-1',
                'transition-[color,opacity] duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive ? 'text-foreground' : 'text-muted-foreground/70 hover:text-foreground',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute inset-x-1 top-1 h-8 rounded-2xl',
                  'bg-foreground/5',
                  'transition-all duration-200 ease-out',
                  isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
                )}
              />

              {Icon && (
                <Icon
                  aria-hidden="true"
                  strokeWidth={isActive ? 2 : 1.75}
                  className={cn(
                    'relative z-10',
                    'size-[21px]',
                    'transition-[transform,opacity] duration-200 ease-out',
                    isActive
                      ? 'opacity-100 scale-[1.06]'
                      : 'opacity-70 scale-100 group-hover:opacity-90',
                  )}
                />
              )}

              <span
                className={cn(
                  'relative z-10 text-[10px] font-medium leading-none',
                  isActive ? 'opacity-100' : 'opacity-60',
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
