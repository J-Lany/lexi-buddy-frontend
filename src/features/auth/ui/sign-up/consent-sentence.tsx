'use client';

import Link from 'next/link';
import React from 'react';

import { useI18n } from '@/shared/i18n';
import type { AppRoutes } from '@/shared/router/routes';
import { routes } from '@/shared/router/routes';

type ConsentToken = 'terms' | 'privacy' | 'pdn';

const TOKEN_PATTERN = /\{\{(terms|privacy|pdn)\}\}/g;

type ConsentPart = { type: 'text'; value: string } | { type: 'link'; token: ConsentToken };

/**
 * Parses a consent sentence template into ordered text/link parts.
 * Tolerant by design: any token order, duplicated tokens, or a missing
 * token are all handled without throwing — a translator editing the
 * sentence can never crash the signup page.
 */
export function parseConsentSentence(template: string): ConsentPart[] {
  const parts: ConsentPart[] = [];
  let lastIndex = 0;

  for (const match of template.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({ type: 'text', value: template.slice(lastIndex, index) });
    }
    parts.push({ type: 'link', token: match[1] as ConsentToken });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < template.length) {
    parts.push({ type: 'text', value: template.slice(lastIndex) });
  }

  return parts;
}

const CONSENT_LINK_CONFIG: Record<ConsentToken, { href: AppRoutes; labelKey: string }> = {
  terms: { href: routes.terms, labelKey: 'auth.signUp.consentTermsLabel' },
  privacy: { href: routes.privacy, labelKey: 'auth.signUp.consentPrivacyLabel' },
  pdn: { href: routes.pdnConsent, labelKey: 'auth.signUp.consentPdnLabel' },
};

const REQUIRED_TOKENS: ConsentToken[] = ['terms', 'privacy', 'pdn'];

function ConsentLink({ token, t }: { token: ConsentToken; t: (key: string) => string }) {
  const config = CONSENT_LINK_CONFIG[token];
  return (
    <Link
      href={config.href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary hover:underline"
    >
      {t(config.labelKey)}
    </Link>
  );
}

/** Renders a locale's consent sentence, turning {{terms}}/{{privacy}}/{{pdn}} into links. */
export function ConsentSentence({ template }: { template: string }) {
  const { t } = useI18n();
  const parts = parseConsentSentence(template);

  const present = new Set(parts.filter((p) => p.type === 'link').map((p) => p.token));
  const missing = REQUIRED_TOKENS.filter((token) => !present.has(token));

  if (process.env.NODE_ENV !== 'production') {
    for (const token of missing) {
      console.warn(
        `[ConsentSentence] the "${token}" token is missing from the consent sentence — falling back to an appended link so it is never lost.`,
      );
    }
  }

  return (
    <>
      {parts.map((part, index) =>
        part.type === 'text' ? (
          <React.Fragment key={index}>{part.value}</React.Fragment>
        ) : (
          <ConsentLink key={index} token={part.token} t={t} />
        ),
      )}
      {missing.length > 0 && (
        <>
          {' '}
          {t('auth.signUp.consentFallbackLead')}{' '}
          {missing.map((token, index) => (
            <React.Fragment key={token}>
              <ConsentLink token={token} t={t} />
              {index < missing.length - 1 ? ', ' : ''}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
}
