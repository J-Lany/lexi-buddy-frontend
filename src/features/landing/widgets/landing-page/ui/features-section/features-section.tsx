'use client';

import { useI18n } from '@/shared/i18n';

export function FeaturesSection() {
  const { t } = useI18n();

  return (
    <section className="section features-section" id="features">
      <div className="reveal">
        <span className="eyebrow">{t('landing.features.eyebrow')}</span>

        <h2 className="section-h">
          {t('landing.features.h2a')}
          <br />
          {t('landing.features.h2b')}
        </h2>

        <p className="section-sub">{t('landing.features.sub')}</p>
      </div>

      <div className="features-grid">
        <div className="feat wide reveal">
          <div className="feat-ico">🤖</div>
          <div className="feat-body">
            <h3>{t('landing.features.aiBuilder')}</h3>
            <p>{t('landing.features.aiBuilderDesc')}</p>
          </div>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">📱</div>
          <h3>{t('landing.features.telegram')}</h3>
          <p>{t('landing.features.telegramDesc')}</p>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">👥</div>
          <h3>{t('landing.features.students')}</h3>
          <p>{t('landing.features.studentsDesc')}</p>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">📊</div>
          <h3>{t('landing.features.progress')}</h3>
          <p>{t('landing.features.progressDesc')}</p>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">🔁</div>
          <h3>{t('landing.features.library')}</h3>
          <p>{t('landing.features.libraryDesc')}</p>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">🌍</div>
          <h3>{t('landing.features.more')}</h3>
          <p>{t('landing.features.moreDesc')}</p>
        </div>
      </div>
    </section>
  );
}
