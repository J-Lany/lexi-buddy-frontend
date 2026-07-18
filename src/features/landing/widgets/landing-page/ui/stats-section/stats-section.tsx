'use client';

import { useI18n } from '@/shared/i18n';

export function StatsSection() {
  const { t } = useI18n();

  return (
    <section className="stats-section">
      <div className="stats-grid reveal">
        <div>
          <div className="stat-n">&lt;2min</div>
          <div className="stat-l">{t('landing.stats.timeLabel')}</div>
        </div>

        <div>
          <div className="stat-n">15</div>
          <div className="stat-l">{t('landing.stats.wordsLabel')}</div>
        </div>

        <div>
          <div className="stat-n">4</div>
          <div className="stat-l">{t('landing.stats.typesLabel')}</div>
        </div>

        <div>
          <div className="stat-n">0</div>
          <div className="stat-l">{t('landing.stats.appsLabel')}</div>
        </div>
      </div>
    </section>
  );
}
