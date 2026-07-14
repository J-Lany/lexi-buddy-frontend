import Link from 'next/link';

import { routes } from '@/shared/router/routes';

const LEGAL_DOCS = [
  { href: routes.privacy, label: 'Политика конфиденциальности' },
  { href: routes.terms, label: 'Пользовательское соглашение' },
  { href: routes.cookiePolicy, label: 'Политика cookie' },
  { href: routes.pdnConsent, label: 'Согласие на обработку ПДн' },
] as const;

type LegalRoute = (typeof LEGAL_DOCS)[number]['href'];

export function LegalDocsNav({ current }: { current: LegalRoute }) {
  return (
    <nav aria-label="Правовые документы" className="flex flex-wrap gap-x-4 gap-y-1.5">
      {LEGAL_DOCS.map((doc) =>
        doc.href === current ? (
          <span key={doc.href} className="ui-stat text-foreground/80">
            {doc.label}
          </span>
        ) : (
          <Link key={doc.href} href={doc.href} className="ui-stat text-primary hover:underline">
            {doc.label}
          </Link>
        ),
      )}
    </nav>
  );
}
