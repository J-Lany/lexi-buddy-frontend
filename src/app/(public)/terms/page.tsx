import type { Metadata } from 'next';
import Link from 'next/link';

import { routes } from '@/shared/router/routes';
import { LegalDocsNav } from '@/shared/ui/legal/legal-docs-nav';
import { LegalDocumentHeader } from '@/shared/ui/legal/legal-document-header';
import { LegalSection } from '@/shared/ui/legal/legal-section';

// The locale is only known client-side (React context + localStorage, gated
// on functional cookie consent) — there is no locale cookie the server can
// read, so this Server Component's metadata cannot follow the user's chosen
// locale without a broader architecture change (out of scope here). The
// visible page heading IS localized via LegalDocumentHeader below; only the
// browser <title>/meta description stay the approved Russian document title.
export const metadata: Metadata = {
  title: 'Пользовательское соглашение',
};

const EFFECTIVE_DATE = '06.07.2026';
const CONTACT_EMAIL = 'lexi.buddy.help@gmail.com';

export default function TermsPage() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="space-y-3">
        <LegalDocumentHeader
          titleKey="termsTitle"
          originalTitle="Пользовательское соглашение (Публичная оферта)"
        />
        <p className="ui-meta">Платформа Lexi Buddy · Редакция от {EFFECTIVE_DATE}</p>
        <LegalDocsNav current={routes.terms} />
      </header>

      <LegalSection title="1. Термины и стороны">
        <p>
          1.1. <strong>Платформа Lexi Buddy</strong> — некоммерческий образовательный онлайн-сервис,
          доступный по адресу{' '}
          <a href="https://www.lexi-buddy.com/" className="text-primary font-medium">
            https://www.lexi-buddy.com/
          </a>{' '}
          и через Telegram-бот{' '}
          <a href="https://t.me/lexi_buddy_bot" className="text-primary font-medium">
            https://t.me/lexi_buddy_bot
          </a>
          .
        </p>
        <p>
          1.2. <strong>Пользователь</strong> — дееспособное физическое лицо, достигшее 18 лет,
          использующее Платформу в качестве преподавателя или студента.
        </p>
        <p>
          1.3. Настоящее Соглашение является публичной офертой. Регистрация или начало использования
          Платформы означает полный и безоговорочный акцепт его условий.
        </p>
      </LegalSection>

      <LegalSection title="2. Предмет">
        <p>
          2.1. Платформа предоставляет Пользователю безвозмездный доступ к функциональности
          Платформы для личного некоммерческого использования в образовательных целях.
        </p>
        <p>2.2. Платформа является некоммерческим проектом; плата за доступ не взимается.</p>
        <p>
          2.3. Платформа может функционировать в режиме бета-версии: отдельные функции могут
          дорабатываться, изменяться или временно быть недоступными.
        </p>
      </LegalSection>

      <LegalSection title="3. Регистрация">
        <p>
          3.1. Преподаватели регистрируются с указанием адреса электронной почты (и, по желанию,
          имени). Студенты регистрируются через Telegram; при этом Платформа получает их никнейм и
          имя из Telegram.
        </p>
        <p>
          3.2. Регистрируясь, Пользователь подтверждает, что ему исполнилось 18 лет, и что
          предоставленные данные достоверны.
        </p>
        <p>3.3. Пользователь отвечает за действия, совершённые под его учётной записью.</p>
      </LegalSection>

      <LegalSection title="4. Права и обязанности Пользователя">
        <p>
          4.1. Пользователю запрещается: нарушать законодательство и права третьих лиц; размещать
          незаконный, оскорбительный или вредоносный контент; нарушать работу Платформы; выдавать
          себя за других лиц.
        </p>
        <p>
          4.2. Платформа вправе ограничить или прекратить доступ Пользователя при нарушении
          Соглашения.
        </p>
      </LegalSection>

      <LegalSection title="5. Пользовательский контент и интеллектуальная собственность">
        <p>
          5.1. Пользователь сохраняет права на создаваемый им контент и предоставляет Платформе
          безвозмездную неисключительную лицензию на его использование в объёме, необходимом для
          работы Платформы.
        </p>
      </LegalSection>

      <LegalSection title="6. Персональные данные">
        <p>
          6.1. Обработка данных Пользователя регулируется{' '}
          <Link href={routes.privacy} className="text-primary font-medium">
            Политикой конфиденциальности
          </Link>{' '}
          Платформы.
        </p>
      </LegalSection>

      <LegalSection title="7. Отказ от гарантий и ограничение ответственности">
        <p>
          7.1. Платформа предоставляется на условиях «как есть» (as is) и «как доступно» (as
          available). Платформа не гарантирует бесперебойной и безошибочной работы, а также
          достижения определённого образовательного результата.
        </p>
      </LegalSection>

      <LegalSection title="8. Изменение и прекращение работы Платформы">
        <p>
          8.1. Как некоммерческий проект, Платформа может изменять, приостанавливать или прекращать
          работу, уведомив Пользователей доступным способом, когда это разумно и возможно.
        </p>
      </LegalSection>

      <LegalSection title="9. Изменение Соглашения">
        <p>
          9.1. Актуальная редакция публикуется на сайте{' '}
          <a href="https://www.lexi-buddy.com/" className="text-primary font-medium">
            https://www.lexi-buddy.com/
          </a>
          . Продолжение использования Платформы после изменений означает согласие с ними.
        </p>
      </LegalSection>

      <LegalSection title="10. Контакты">
        <p>
          Email:{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium">
            {CONTACT_EMAIL}
          </a>
        </p>
      </LegalSection>
    </article>
  );
}
