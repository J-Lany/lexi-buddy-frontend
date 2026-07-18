'use client';

import Link from 'next/link';

import { useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';

export function CtaSection() {
  const { t } = useI18n();

  return (
    <section className="cta-section">
      <div className="cta-free-pill reveal">{t('landing.cta.pill')}</div>

      <h2 className="cta-h reveal">{t('landing.cta.h2')}</h2>

      <p className="cta-p reveal">{t('landing.cta.p')}</p>

      <div className="reveal">
        <Link href={routes.register} className="btn-white">
          {t('landing.cta.btn')}
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <p className="cta-note reveal">
        {t('landing.cta.note').split('@lexi_buddy_bot')[0]}
        <a href="https://t.me/lexi_buddy_bot">@lexi_buddy_bot</a>
        {t('landing.cta.note').split('@lexi_buddy_bot')[1]}
      </p>
    </section>
  );
}
