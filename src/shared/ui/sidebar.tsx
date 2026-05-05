'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { mainNav } from '@/shared/catalogs/navigation/main-nav';
import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="ui-sidebar-nav">
      <div className="ui-sidebar-list">
        {mainNav.map(({ label, labelKey, href, icon: Icon }) => {
          const isActive = pathname?.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn('ui-sidebar-item ui-focus', isActive && 'ui-sidebar-item-active')}
            >
              <span className="flex items-center gap-3">
                {Icon && (
                  <Icon
                    aria-hidden
                    className="shrink-0"
                    style={{ width: 16, height: 16, opacity: isActive ? 1 : 0.65 }}
                    strokeWidth={isActive ? 2 : 1.75}
                  />
                )}
                {t(labelKey) || label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
