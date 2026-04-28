'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="hero" id="home">
      <div className="hero-bg-glow" />
      <div className="hero-grid-dots" />

      <div className="hero-left">
        <div className="hero-badge">
          <span className="badge-dot" />
          {t('landing.hero.badge')}
        </div>

        <div className="typing-wrap">
          <div className="typing-bubble">
            <Image src="/icon.webp" alt="Lexi" width={26} height={26} priority unoptimized />
            <span id="typed-text" />
            <span className="cursor" />
          </div>
        </div>

        <h1>
          {t('landing.hero.h1a')}
          <br />
          {t('landing.hero.h1b')} <span className="accent">{t('landing.hero.h1aiLabel')}</span>{' '}
          {t('landing.hero.h1c')}
          <br />
          {t('landing.hero.h1d')}
        </h1>

        <p className="hero-sub">{t('landing.hero.sub')}</p>

        <div className="hero-ctas">
          <Link href={routes.register} className="btn-primary">
            {t('landing.hero.ctaPrimary')}
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

          <Link href="#telegram" className="btn-ghost">
            {t('landing.hero.ctaSecondary')}
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 3v10M4 9l4 4 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="hero-trust">
          <div className="avatars">
            <span>👩‍🏫</span>
            <span>👨‍🏫</span>
            <span>👩‍🎓</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--teal-dark)' }}>+</span>
          </div>

          <p className="trust-text">{t('landing.hero.trust')}</p>
        </div>
      </div>

      <div className="hero-right">
        <div className="mascot-wrap">
          <Image
            src="/icon.webp"
            alt="Lexi Buddy mascot"
            width={410}
            height={410}
            priority
            unoptimized
          />

          <div className="fc fc1">
            <div className="fc-label">AI glossary</div>
            <div className="fc-row">
              <span className="fc-dot" /> boiled → <b>сваренный</b>
            </div>
            <div className="fc-row" style={{ marginTop: 4 }}>
              <span className="fc-dot or" /> fried → <b>жареный</b>
            </div>
          </div>

          <div className="fc fc2">
            <div className="fc-label">Student progress</div>
            <div className="fc-row">
              <span className="fc-dot gr" /> <b>12 / 15</b> tasks done
            </div>
            <div className="fc-prog">
              <div className="fc-prog-bar" />
            </div>
          </div>

          <div className="fc fc3">
            <div className="fc-label">New lesson ready ⚡</div>
            <div className="fc-row">
              <b>Food &amp; Cooking</b> · B1 · Adults
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
