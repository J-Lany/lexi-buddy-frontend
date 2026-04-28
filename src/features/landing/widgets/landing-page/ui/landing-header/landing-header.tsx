'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';

export function LandingHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { t } = useI18n();

  return (
    <nav id="nav">
      <Link href={routes.main} className="nav-logo">
        <Image src="/icon.webp" alt="Lexi Buddy" width={38} height={38} priority unoptimized />

        <span className="ui-brand">Lexi buddy</span>
      </Link>

      <div className="nav-center">
        <Link href="#telegram">Telegram</Link>
        <Link href="#how">{t('landing.nav.how')}</Link>
        <Link href="#features">{t('landing.nav.features')}</Link>
        <Link href="#tasks">{t('landing.nav.tasks')}</Link>
        <Link href="#testimonials">{t('landing.nav.testimonials')}</Link>
        <span className="nav-sep" aria-hidden />
        <Link href={routes.help} className="nav-help">
          {t('landing.nav.help')}
        </Link>
      </div>

      <div className="nav-right">
        <Link href={routes.help} className="nav-help-mobile">
          {t('landing.nav.helpMobile')}
        </Link>

        {isLoggedIn ? (
          <Link href={routes.students} className="nav-cta">
            {t('landing.nav.openApp')}
          </Link>
        ) : (
          <>
            <Link href={routes.login} className="nav-login">
              {t('landing.nav.login')}
            </Link>

            <Link href={routes.register} className="nav-cta">
              {t('landing.nav.getStarted')}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
