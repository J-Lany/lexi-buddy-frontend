'use client';

import { useI18n } from '@/shared/i18n';

export function TestimonialsSection() {
  const { t } = useI18n();

  return (
    <section className="section testi-section" id="testimonials">
      <div className="reveal">
        <span className="eyebrow">{t('landing.testimonials.eyebrow')}</span>

        <h2 className="section-h">
          {t('landing.testimonials.h2a')}
          <br />
          {t('landing.testimonials.h2b')}
        </h2>
      </div>

      <div className="testi-grid">
        <div className="testi reveal">
          <div className="testi-stars">★★★★★</div>
          <p className="testi-text">{t('landing.testimonials.t1text')}</p>
          <div className="testi-author">
            <div className="testi-ava">👩‍🏫</div>
            <div>
              <div className="testi-name">{t('landing.testimonials.t1name')}</div>
              <div className="testi-role">{t('landing.testimonials.t1role')}</div>
            </div>
          </div>
        </div>

        <div className="testi reveal">
          <div className="testi-stars">★★★★★</div>
          <p className="testi-text">{t('landing.testimonials.t2text')}</p>
          <div className="testi-author">
            <div className="testi-ava">👨‍🏫</div>
            <div>
              <div className="testi-name">{t('landing.testimonials.t2name')}</div>
              <div className="testi-role">{t('landing.testimonials.t2role')}</div>
            </div>
          </div>
        </div>

        <div className="testi reveal">
          <div className="testi-stars">★★★★★</div>
          <p className="testi-text">{t('landing.testimonials.t3text')}</p>
          <div className="testi-author">
            <div className="testi-ava">👩‍💼</div>
            <div>
              <div className="testi-name">{t('landing.testimonials.t3name')}</div>
              <div className="testi-role">{t('landing.testimonials.t3role')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
