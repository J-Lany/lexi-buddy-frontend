'use client';

import { useI18n } from '@/shared/i18n';

/**
 * No approved EN/ES/KZ legal translation exists yet — the document body stays
 * in Russian for every locale. This notice makes that explicit instead of
 * silently mixing languages, and never claims the Russian body is a
 * localized legal version.
 */
export function LegalRussianOnlyNotice() {
  const { locale, t } = useI18n();

  if (locale === 'ru') return null;

  return (
    <p className="ui-meta rounded-2xl border border-border bg-muted/40 px-4 py-2.5 text-sm">
      {t('legal.russianOnlyNotice')}
    </p>
  );
}
