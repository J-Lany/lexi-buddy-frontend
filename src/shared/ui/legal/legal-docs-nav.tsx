'use client';

import Link from 'next/link';

import { useI18n } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { routes } from '@/shared/router/routes';

const LEGAL_DOCS = [
  { href: routes.privacy, labelKey: 'legal.nav.privacy' },
  { href: routes.terms, labelKey: 'legal.nav.terms' },
  { href: routes.cookiePolicy, labelKey: 'legal.nav.cookiePolicy' },
  { href: routes.pdnConsent, labelKey: 'legal.nav.pdnConsent' },
] as const;

type LegalRoute = (typeof LEGAL_DOCS)[number]['href'];

export function LegalDocsNav({ current }: { current: LegalRoute }) {
  const { t } = useI18n();

  return (
    <nav
      aria-label={t('legal.nav.ariaLabel')}
      className="flex max-w-full flex-wrap gap-2 overflow-x-auto"
    >
      {LEGAL_DOCS.map((doc) => {
        const isActive = doc.href === current;
        return (
          <Link
            key={doc.href}
            href={doc.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'ui-focus shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5',
              'text-sm font-medium transition-colors',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground',
            )}
          >
            {t(doc.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
