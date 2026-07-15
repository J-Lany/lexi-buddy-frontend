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
  title: 'Политика конфиденциальности',
};

const EFFECTIVE_DATE = '06.07.2026';
const CONTACT_EMAIL = 'lexi.buddy.help@gmail.com';

export default function PrivacyPage() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="space-y-3">
        <LegalDocumentHeader
          titleKey="privacyTitle"
          originalTitle="Политика конфиденциальности и обработки персональных данных"
        />
        <p className="ui-meta">Платформа Lexi Buddy · Редакция от {EFFECTIVE_DATE}</p>
        <LegalDocsNav current={routes.privacy} />
      </header>

      <LegalSection title="1. Общие положения">
        <p>
          1.1. Настоящая Политика определяет порядок сбора, обработки, хранения и защиты
          персональных данных пользователей некоммерческой образовательной платформы Lexi Buddy
          (далее — «Платформа»), доступной по адресу{' '}
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
          1.2. Платформа является <strong>некоммерческим</strong> проектом и предоставляется на
          безвозмездной основе. Платформа не взимает плату за доступ.
        </p>
        <p>
          1.3. Начиная использовать Платформу и предоставляя свои данные, пользователь подтверждает
          согласие с настоящей Политикой. Если пользователь не согласен — он должен воздержаться от
          использования Платформы.
        </p>
        <p>
          1.4. Платформа предназначена для лиц, достигших 18 лет. Платформа не осуществляет
          осознанный сбор данных несовершеннолетних.
        </p>
      </LegalSection>

      <LegalSection title="2. Категории пользователей и обрабатываемые данные">
        <p>Платформа обрабатывает минимально необходимый объём данных.</p>
        <p>
          <strong>2.1. Пользователи Платформы по адресу https://www.lexi-buddy.com:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>адрес электронной почты (обязательно);</li>
          <li>имя или отображаемое имя (по желанию пользователя).</li>
        </ul>
        <p>
          <strong>
            2.2. Пользователи Платформы через Telegram-бот https://t.me/lexi_buddy_bot:
          </strong>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>имя пользователя (никнейм) в Telegram;</li>
          <li>имя или отображаемое имя, указанное пользователем в Telegram.</li>
        </ul>
        <p>
          <strong>2.3. Технические данные</strong> (при использовании веб-сайта): данные о сессии и
          файлах cookie, необходимые для работы Платформы (см.{' '}
          <Link href={routes.cookiePolicy} className="text-primary font-medium">
            Политику в отношении файлов cookie
          </Link>
          ).
        </p>
        <p>
          2.4. Платформа <strong>не собирает</strong> специальные категории данных (о здоровье,
          национальности, политических или религиозных взглядах и т. п.), платёжные данные, а также
          данные сверх перечисленных в п. 2.1–2.3.
        </p>
      </LegalSection>

      <LegalSection title="3. Цели и правовое основание обработки">
        <p>
          3.1. Данные обрабатываются{' '}
          <strong>исключительно в целях осуществления некоммерческой деятельности Платформы</strong>
          , а именно:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>регистрация и идентификация преподавателей и студентов;</li>
          <li>
            предоставление образовательной функциональности Платформы и связь студентов с
            преподавателями и учебными материалами;
          </li>
          <li>направление уведомлений и учебных материалов через Telegram;</li>
          <li>обеспечение работы и безопасности Платформы.</li>
        </ul>
        <p>
          3.2. Платформа <strong>не использует</strong> данные в коммерческих целях: не продаёт их,
          не передаёт третьим лицам для маркетинга, не использует для рекламы и профилирования в
          маркетинговых целях.
        </p>
        <p>
          3.3. <strong>Правовое основание обработки — согласие субъекта персональных данных</strong>
          , которое может быть отозвано в любой момент (раздел 7).
        </p>
      </LegalSection>

      <LegalSection title="4. Использование Telegram">
        <p>
          4.1. Регистрация и взаимодействие студентов осуществляются через мессенджер Telegram. При
          этом Платформа получает имя пользователя (никнейм) и указанное пользователем имя в
          Telegram.
        </p>
        <p>
          4.2. Telegram является самостоятельным сервисом и третьим лицом; обработка данных на его
          стороне регулируется собственной политикой конфиденциальности Telegram, за которую
          Платформа не отвечает. Используя Telegram для взаимодействия с Платформой, пользователь
          принимает условия Telegram.
        </p>
      </LegalSection>

      <LegalSection title="5. Передача третьим лицам">
        <p>
          5.1. Платформа не продаёт персональные данные и не передаёт их третьим лицам, кроме
          поставщиков инфраструктуры, действующих по поручению Платформы (хостинг, сервис Telegram),
          и случаев, прямо предусмотренных законом.
        </p>
      </LegalSection>

      <LegalSection title="6. Сроки хранения">
        <p>
          6.1. Данные хранятся в течение срока использования Платформы, после чего удаляются или
          обезличиваются, за исключением случаев, когда хранение требуется по закону.
        </p>
      </LegalSection>

      <LegalSection title="7. Защита данных и инциденты">
        <p>
          7.1. Платформа принимает разумные организационные и технические меры защиты (разграничение
          доступа, защита каналов передачи, резервное копирование).
        </p>
      </LegalSection>

      <LegalSection title="8. Изменения Политики">
        <p>
          8.1. Актуальная редакция публикуется на сайте{' '}
          <a href="https://www.lexi-buddy.com/" className="text-primary font-medium">
            https://www.lexi-buddy.com/
          </a>{' '}
          с указанием даты. Существенные изменения доводятся до пользователей дополнительно.
        </p>
      </LegalSection>

      <LegalSection title="9. Контакты">
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
