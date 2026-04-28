'use client';

import { useI18n } from '@/shared/i18n';

export function TasksSection() {
  const { t } = useI18n();

  return (
    <section className="section tasks-section" id="tasks">
      <div className="reveal">
        <span className="eyebrow">{t('landing.tasks.eyebrow')}</span>

        <h2 className="section-h">
          {t('landing.tasks.h2a')}
          <br />
          {t('landing.tasks.h2b')}
        </h2>

        <p className="section-sub">{t('landing.tasks.sub')}</p>
      </div>

      <div className="tasks-grid">
        <div className="task reveal">
          <div className="task-n">01</div>
          <div>
            <h3>{t('landing.tasks.quiz')}</h3>
            <p>{t('landing.tasks.quizDesc')}</p>
          </div>
        </div>

        <div className="task reveal">
          <div className="task-n">02</div>
          <div>
            <h3>{t('landing.tasks.gap')}</h3>
            <p>{t('landing.tasks.gapDesc')}</p>
          </div>
        </div>

        <div className="task reveal">
          <div className="task-n">03</div>
          <div>
            <h3>{t('landing.tasks.phrase')}</h3>
            <p>{t('landing.tasks.phraseDesc')}</p>
          </div>
        </div>

        <div className="task reveal">
          <div className="task-n">04</div>
          <div>
            <h3>{t('landing.tasks.collocation')}</h3>
            <p>{t('landing.tasks.collocationDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
