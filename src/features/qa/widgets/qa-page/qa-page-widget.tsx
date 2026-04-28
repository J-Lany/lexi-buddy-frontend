'use client';

import './qa-page.css';

import { HelpCircle } from 'lucide-react';

import { useI18n } from '@/shared/i18n';

import { useQaState } from '../../model/use-qa-state';

export function QaPageWidget() {
  const { t } = useI18n();
  const {
    search,
    filtered,
    openCategory,
    openItem,
    totalQuestions,
    totalCategories,
    handleSearchChange,
    toggleCategory,
    toggleItem,
  } = useQaState();

  return (
    <main className="qa-page">
      <div className="qa-page-header">
        <div className="qa-page-title-row">
          <div className="h-11 w-11 shrink-0">
            <HelpCircle className="h-11 w-11 text-primary" aria-hidden />
          </div>

          <div>
            <div className="qa-page-eyebrow">{t('qa.eyebrow')}</div>
            <h1 className="qa-page-title">{t('qa.title')}</h1>
          </div>
        </div>

        <p className="qa-page-subtitle">
          {totalQuestions} {t('qa.subtitleCount')} {totalCategories} {t('qa.subtitleTopics')}
        </p>
      </div>

      <div className="qa-page-content">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>

          <input
            className="search-input"
            type="text"
            placeholder={t('qa.searchPlaceholder')}
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔎</div>
            <div>
              {t('qa.noResults')} <strong>&quot;{search}&quot;</strong>
            </div>
            <div className="no-results-hint">{t('qa.noResultsHint')}</div>
          </div>
        ) : (
          filtered.map((cat) => {
            const catKey = cat.category;
            const isCatOpen = search !== '' || openCategory === catKey;

            return (
              <div className="qa-card" key={catKey}>
                <button
                  type="button"
                  className="cat-header"
                  onClick={() => toggleCategory(catKey, isCatOpen)}
                >
                  <span className="cat-title">
                    <span className="cat-icon">{cat.icon}</span>
                    {cat.category}
                    <span className="cat-count">
                      {cat.items.length}
                      {t('qa.countSuffix')}
                    </span>
                  </span>

                  <span className={`cat-chevron ${isCatOpen ? 'open' : ''}`}>▾</span>
                </button>

                {isCatOpen ? (
                  <div className="cat-body">
                    {cat.items.map((item, index) => {
                      const itemKey = `${catKey}-${index}`;
                      const isOpen = openItem === itemKey;

                      return (
                        <div className="qa-item" key={itemKey}>
                          <button
                            type="button"
                            className="qa-q"
                            onClick={() => toggleItem(itemKey, isOpen)}
                          >
                            <span className={`qa-q-text ${isOpen ? 'active' : ''}`}>{item.q}</span>

                            <span className={`qa-q-chevron ${isOpen ? 'open' : ''}`}>▾</span>
                          </button>

                          <div className={`qa-answer ${isOpen ? 'open' : ''}`}>
                            <p>{item.a}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
