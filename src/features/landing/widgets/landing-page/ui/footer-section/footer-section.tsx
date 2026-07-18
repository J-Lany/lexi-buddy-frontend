'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useI18n } from '@/shared/i18n';
import { requestOpenCookieSettings } from '@/shared/lib/cookie-consent';
import { routes } from '@/shared/router/routes';

export function FooterSection() {
  const { t } = useI18n();

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="#" className="footer-logo">
            <Image src="/icon.webp" alt="Lexi Buddy" width={34} height={34} unoptimized />

            <span className="footer-logo-wm">
              Lexi <b>Buddy</b>
            </span>
          </Link>

          <p className="footer-tagline">{t('landing.footer.tagline')}</p>
        </div>

        <div className="footer-col">
          <h4>{t('landing.footer.product')}</h4>
          <Link href="#telegram">{t('landing.footer.telegramBot')}</Link>
          <Link href="#how">{t('landing.footer.howItWorks')}</Link>
          <Link href="#features">{t('landing.footer.features')}</Link>
          <Link href="#tasks">{t('landing.footer.exerciseTypes')}</Link>
        </div>

        <div className="footer-col">
          <h4>{t('landing.footer.account')}</h4>
          <Link href={routes.login}>{t('landing.footer.login')}</Link>
          <Link href={routes.register}>{t('landing.footer.getStarted')}</Link>
        </div>

        <div className="footer-col">
          <h4>{t('landing.footer.students')}</h4>
          <a href="https://t.me/lexi_buddy_bot" target="_blank">
            @lexi_buddy_bot
          </a>
        </div>

        <div className="footer-col">
          <h4>{t('landing.footer.support')}</h4>
          <Link href={routes.help}>{t('landing.footer.helpQa')}</Link>
        </div>

        <div className="footer-col">
          <h4>{t('landing.footer.legal')}</h4>
          <Link href={routes.terms}>{t('landing.footer.terms')}</Link>
          <Link href={routes.privacy}>{t('landing.footer.privacy')}</Link>
          <Link href={routes.cookiePolicy}>{t('landing.footer.cookiePolicy')}</Link>
          <Link href={routes.pdnConsent}>{t('landing.footer.pdnConsent')}</Link>
          <button type="button" onClick={requestOpenCookieSettings}>
            {t('cookies.manageLink')}
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{t('landing.footer.copyright')}</span>
        <span>{t('landing.footer.builtFor')}</span>
      </div>
    </footer>
  );
}
