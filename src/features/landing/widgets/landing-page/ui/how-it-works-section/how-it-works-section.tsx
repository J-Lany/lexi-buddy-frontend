'use client';

import { useI18n } from '@/shared/i18n';

export function HowItWorksSection() {
  const { t } = useI18n();

  return (
    <section className="section how-section" id="how">
      <div className="reveal">
        <span className="eyebrow">{t('landing.howItWorks.eyebrow')}</span>

        <h2 className="section-h">
          {t('landing.howItWorks.h2a')}
          <br />
          {t('landing.howItWorks.h2b')}
        </h2>

        <p className="section-sub">{t('landing.howItWorks.sub')}</p>
      </div>

      <div className="steps-wrap">
        <div className="steps-grid reveal">
          <div className="step">
            <div className="step-n">01</div>
            <div className="step-ico">📝</div>
            <h3>{t('landing.howItWorks.step1title')}</h3>
            <p>{t('landing.howItWorks.step1desc')}</p>
          </div>

          <div className="step">
            <div className="step-n">02</div>
            <div className="step-ico">📋</div>
            <h3>{t('landing.howItWorks.step2title')}</h3>
            <p>{t('landing.howItWorks.step2desc')}</p>
          </div>

          <div className="step">
            <div className="step-n">03</div>
            <div className="step-ico">⚡</div>
            <h3>{t('landing.howItWorks.step3title')}</h3>
            <p>{t('landing.howItWorks.step3desc')}</p>
          </div>

          <div className="step">
            <div className="step-n">04</div>
            <div className="step-ico">🚀</div>
            <h3>{t('landing.howItWorks.step4title')}</h3>
            <p>{t('landing.howItWorks.step4desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
