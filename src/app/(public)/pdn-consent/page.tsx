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
  title: 'Согласие на обработку персональных данных',
};

const CONTACT_EMAIL = 'lexi.buddy.help@gmail.com';

export default function PdnConsentPage() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="space-y-3">
        <LegalDocumentHeader
          titleKey="pdnConsentTitle"
          originalTitle="Согласие на сбор и обработку персональных данных"
        />
        <p className="ui-meta">Платформа Lexi Buddy</p>
        <LegalDocsNav current={routes.pdnConsent} />
      </header>

      <p className="ui-meta">
        Я, субъект персональных данных, действуя своей волей и в своём интересе, даю согласие на
        сбор и обработку моих персональных данных на следующих условиях.
      </p>

      <LegalSection title="1. Перечень персональных данных">
        <ul className="list-disc pl-5 space-y-1">
          <li>имя пользователя (никнейм) в Telegram; имя/отображаемое имя в Telegram;</li>
          <li>технические данные, необходимые для работы веб-сайта (при его использовании).</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Цели обработки">
        <p>
          Данные обрабатываются исключительно для осуществления некоммерческой деятельности
          Платформы: регистрация и идентификация; предоставление образовательной функциональности;
          связь со мной по электронной почте и через Telegram; обеспечение работы и безопасности
          Платформы.
        </p>
      </LegalSection>

      <LegalSection title="3. Перечень действий с данными">
        <p>
          Сбор, запись, систематизация, хранение, уточнение, использование, передача (в объёме,
          необходимом поставщикам инфраструктуры и через Telegram), обезличивание, блокирование,
          удаление.
        </p>
      </LegalSection>

      <LegalSection title="4. Срок действия согласия">
        <p>
          Согласие действует с момента предоставления в течение срока использования мной Платформы.
        </p>
      </LegalSection>

      <LegalSection title="5. Отзыв согласия">
        <p>
          Я вправе отозвать согласие в любой момент, перестав использование платформы и направив
          жалобу на{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-medium">
            {CONTACT_EMAIL}
          </a>
          . После отзыва Платформа прекращает обработку и удаляет/обезличивает данные в
          установленный срок, кроме случаев, когда хранение требуется по закону.
        </p>
      </LegalSection>

      <LegalSection title="6. Подтверждения">
        <p>
          Мне исполнилось 18 лет; предоставленные данные достоверны; я ознакомлен(а) со своими
          правами субъекта персональных данных, изложенными в{' '}
          <Link href={routes.privacy} className="text-primary font-medium">
            Политике конфиденциальности
          </Link>
          .
        </p>
      </LegalSection>

      <p className="ui-meta italic">
        Согласие считается предоставленным в момент проставления отметки в поле при регистрации на
        веб-сайте либо нажатия кнопки подтверждения в Telegram-боте.
      </p>
    </article>
  );
}
