import type { Metadata } from 'next';

import { routes } from '@/shared/router/routes';
import { LegalDocsNav } from '@/shared/ui/legal/legal-docs-nav';
import { LegalSection } from '@/shared/ui/legal/legal-section';

export const metadata: Metadata = {
  title: 'Политика cookie — Lexi Buddy',
};

const EFFECTIVE_DATE = '06.07.2026';
const CONTACT_EMAIL = 'lexi.buddy.help@gmail.com';

export default function CookiePolicyPage() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="space-y-3">
        <h1 className="ui-page-title">Политика в отношении файлов cookie</h1>
        <p className="ui-meta">Платформа Lexi Buddy · Редакция от {EFFECTIVE_DATE}</p>
        <LegalDocsNav current={routes.cookiePolicy} />
      </header>

      <LegalSection title="1. Что такое файлы cookie">
        <p>
          Файлы cookie — небольшие текстовые файлы, сохраняемые в браузере при использовании сайта{' '}
          <a href="https://www.lexi-buddy.com/" className="text-primary font-medium">
            https://www.lexi-buddy.com/
          </a>
          ; они позволяют распознавать устройство пользователя и сохранять настройки.
        </p>
      </LegalSection>

      <LegalSection title="2. Какие cookie используются">
        <p>
          <strong>2.1. Строго необходимые</strong> — обеспечивают работу сайта, аутентификацию и
          сессию. Согласия не требуют.
        </p>
        <p>
          <strong>2.2. Функциональные</strong> — запоминают настройки пользователя (например, язык).
        </p>
        <p>
          <strong>2.3. Аналитические</strong> — помогают в обезличенном виде понять использование
          сайта.
        </p>
      </LegalSection>

      <LegalSection title="3. Управление cookie">
        <p>
          3.1. При первом посещении показывается баннер с возможностью принять или отклонить
          необязательные cookie.
        </p>
        <p>
          3.2. Пользователь может изменить выбор, удалив cookie в настройках браузера. Отключение
          необходимых cookie может ограничить работу сайта.
        </p>
      </LegalSection>

      <LegalSection title="4. Сроки хранения">
        <p>
          Сессионные cookie удаляются при закрытии браузера; постоянные хранятся до 12 месяцев или
          до удаления пользователем.
        </p>
      </LegalSection>

      <LegalSection title="5. Изменения и контакты">
        <p>
          Актуальная редакция публикуется на сайте{' '}
          <a href="https://www.lexi-buddy.com/" className="text-primary font-medium">
            https://www.lexi-buddy.com/
          </a>
          .
        </p>
        <p>
          Вопросы:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium">
            {CONTACT_EMAIL}
          </a>
        </p>
      </LegalSection>
    </article>
  );
}
