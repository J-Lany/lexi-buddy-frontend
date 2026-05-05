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

          {/* Card 1: Teacher Dashboard */}
          <div className="fc fc1" style={{ top: '8%', left: '-40%' }}>
            <div className="fc-label">Teacher dashboard</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {(
                [
                  { num: '5', lbl: 'Students' },
                  { num: '3', lbl: 'Lessons' },
                  { num: '87%', lbl: 'Avg progress' },
                  { num: '4.8', lbl: 'Avg score' },
                ] as const
              ).map(({ num, lbl }) => (
                <div
                  key={lbl}
                  style={{ background: '#e0f7f9', borderRadius: 10, padding: '8px 10px' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#1a9fac',
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ fontSize: 10, color: '#627e82', marginTop: 3, fontWeight: 500 }}>
                    {lbl}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Student receives in Telegram */}
          <div className="fc fc2" style={{ top: '55%', right: '-28%' }}>
            <div className="fc-label">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="#2dbfcc" aria-hidden>
                <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0zm5.78 8.25-2.01 9.49c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.873.722z" />
              </svg>
              Student receives in Telegram
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: '#2dbfcc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden>
                  <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0zm5.78 8.25-2.01 9.49c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.873.722z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0d2b2e', lineHeight: 1.3 }}>
                  📚 New lesson assigned!
                </div>
                <div style={{ fontSize: 11.5, color: '#627e82', marginTop: 3, lineHeight: 1.5 }}>
                  Food &amp; Cooking · B1
                  <br />4 exercises ready for you
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    marginTop: 6,
                    background: 'rgba(45,191,204,0.12)',
                    color: '#1a9fac',
                    fontFamily: 'var(--mono)',
                    fontSize: 10.5,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 100,
                    border: '1px solid rgba(45,191,204,0.25)',
                  }}
                >
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" aria-hidden>
                    <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0zm5.78 8.25-2.01 9.49c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.873.722z" />
                  </svg>
                  @lexi_buddy_bot
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Lesson completed */}
          <div className="fc fc3" style={{ bottom: '2%', left: '-32%' }}>
            <div className="fc-label">Lesson completed ✓</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: '#e0f7f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 17,
                  flexShrink: 0,
                }}
              >
                ⚡
              </div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0d2b2e' }}>
                  Food &amp; Cooking
                </div>
                <div style={{ fontSize: 11.5, color: '#627e82', marginTop: 2, fontWeight: 400 }}>
                  Anna · B1 · 3 of 4 done
                </div>
              </div>
            </div>
            <div style={{ height: 5, borderRadius: 4, overflow: 'hidden', background: '#e0f7f9' }}>
              <div
                style={{ width: '75%', height: '100%', background: '#2dbfcc', borderRadius: 4 }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 5,
                fontSize: 10.5,
                fontWeight: 600,
                color: '#627e82',
              }}
            >
              <span>Progress</span>
              <span>75%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
