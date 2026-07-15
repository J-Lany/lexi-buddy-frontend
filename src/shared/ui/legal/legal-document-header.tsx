'use client';

import { useI18n } from '@/shared/i18n';
import type { Translations } from '@/shared/i18n/locales';

import { LegalRussianOnlyNotice } from './legal-russian-only-notice';

type LegalPageTitleKey = keyof Translations['legal']['pages'];

type Props = {
  /** Key under legal.pages.* for the localized UI title (not the legal document itself). */
  titleKey: LegalPageTitleKey;
  /** The original, legally approved Russian heading — verbatim, never translated. */
  originalTitle: string;
};

/**
 * Only Russian legal text is currently approved. For non-ru locales this
 * renders, in order: a localized UI title, a notice that the approved text
 * is Russian-only, an "official Russian text" label, and then the original
 * Russian heading (unchanged) directly above the (also unchanged) document
 * body. For ru, only the original heading is shown — no notice, no
 * duplicate title.
 */
export function LegalDocumentHeader({ titleKey, originalTitle }: Props) {
  const { locale, t } = useI18n();
  const isRussian = locale === 'ru';

  return (
    <>
      {!isRussian && <h1 className="ui-page-title">{t(`legal.pages.${titleKey}`)}</h1>}
      <LegalRussianOnlyNotice />
      {!isRussian && (
        <p className="ui-meta font-semibold text-foreground/70">
          {t('legal.officialRussianTextLabel')}
        </p>
      )}
      {isRussian ? (
        <h1 className="ui-page-title">{originalTitle}</h1>
      ) : (
        <h2 className="ui-page-title">{originalTitle}</h2>
      )}
    </>
  );
}
