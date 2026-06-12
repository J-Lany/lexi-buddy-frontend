// TODO (legal): Fill every [placeholder] with real ИП details before launch.
// TODO (legal): Have a licensed attorney review this policy for RK Law No. 94-V compliance.
// TODO (legal): Confirm data localization (Art. 16 of Law 94-V) — personal data of RK citizens
//               must be stored in a database physically located in Kazakhstan. Verify your hosting.
// TODO (ops): Keep CONSENT_VERSION in consent-storage.ts in sync with the Version field below.

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Cookie Policy — Lexi Buddy',
};

// TODO: Replace with real operator details.
const OPERATOR_NAME = '[ИП Name]';
const OPERATOR_BIN = '[БИН/ИИН]';
const OPERATOR_ADDRESS = '[City, Kazakhstan]';
const OPERATOR_EMAIL = '[contact@example.com]';
const EFFECTIVE_DATE = '[DD.MM.YYYY]';
const POLICY_VERSION = 1; // keep in sync with CONSENT_VERSION

export default function PrivacyPage() {
  return (
    <article className="max-w-[720px] mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="ui-page-title">Privacy &amp; Cookie Policy</h1>
        <p className="ui-meta">
          Effective date: {EFFECTIVE_DATE} · Version: {POLICY_VERSION}
        </p>
      </header>

      <Section title="1. Operator">
        <p>The data operator is the sole proprietor (ИП):</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Name: {OPERATOR_NAME}</li>
          <li>БИН/ИИН: {OPERATOR_BIN}</li>
          <li>Address: {OPERATOR_ADDRESS}</li>
          <li>Contact: {OPERATOR_EMAIL}</li>
        </ul>
        <p>
          This Policy follows the Law of the Republic of Kazakhstan No. 94-V dated 21 May 2013
          &ldquo;On Personal Data and Its Protection&rdquo;.
        </p>
      </Section>

      <Section title="2. Data we process">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Technical data</strong> needed to run the service: session data, chosen
            interface language, basic security logs.
          </li>
          <li>
            <strong>Account data</strong> you provide at sign-up: name, email, and anything you add
            voluntarily.
          </li>
        </ul>
        <p>We do not collect data for advertising and do not use tracking analytics.</p>
      </Section>

      <Section title="3. Purposes">
        <p>
          Providing and running the service; authentication and keeping you signed in; remembering
          preferences (e.g. language); security and abuse prevention; performing our service
          contract with you.
        </p>
      </Section>

      <Section title="4. Legal basis">
        <p>
          Your consent, performance of the contract you are party to, and other grounds permitted by
          the legislation of the Republic of Kazakhstan.
        </p>
      </Section>

      <Section title="5. Cookies">
        <p>
          We use <strong>strictly necessary cookies only</strong>: session/authentication cookies
          (to keep you signed in) and functional cookies (to remember your language and settings).
          No advertising or analytics cookies. Because these are essential, they are set on the
          basis of legitimate interest and contract performance; we inform you of their use on your
          first visit.
        </p>
      </Section>

      <Section title="6. Retention">
        <p>
          Personal data is kept no longer than necessary for the stated purposes or as required by
          RK law. Account data is kept until the account is deleted; technical cookies last for
          their defined lifetime.
        </p>
      </Section>

      <Section title="7. Sharing &amp; cross-border transfer">
        <p>
          We do not sell personal data. Data may be processed by infrastructure providers (hosting,
          email) solely for the purposes above.
        </p>
        {/* TODO: List providers and hosting countries; state the lawful basis for any cross-border transfer. */}
        <p className="ui-stat text-warning">
          TODO: list infrastructure providers and countries, and state the basis for any
          cross-border transfer.
        </p>
      </Section>

      <Section title="8. Storage within Kazakhstan">
        {/* TODO: Describe where RK citizens' personal data is physically stored per Law 94-V. */}
        <p className="ui-stat text-warning">
          TODO: describe where personal data of RK citizens is physically stored (data localization
          requirement, Law No. 94-V).
        </p>
      </Section>

      <Section title="9. Your rights">
        <p>
          Access, rectification, erasure, restriction of processing, and the right to{' '}
          <strong>withdraw consent</strong> at any time. To exercise these, contact{' '}
          <a href={`mailto:${OPERATOR_EMAIL}`} className="text-primary font-medium">
            {OPERATOR_EMAIL}
          </a>
          ; we respond within the timeframes set by RK law.
        </p>
      </Section>

      <Section title="10. Changes">
        <p>
          On material changes we bump the version and re-request acknowledgement on the next visit.
        </p>
      </Section>

      <Section title="11. Operator details">
        <p>
          ИП &ldquo;{OPERATOR_NAME}&rdquo;, БИН/ИИН {OPERATOR_BIN}, {OPERATOR_ADDRESS},{' '}
          <a href={`mailto:${OPERATOR_EMAIL}`} className="text-primary font-medium">
            {OPERATOR_EMAIL}
          </a>
          .
        </p>
      </Section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="ui-card-static ui-radius-card p-5 sm:p-6 space-y-3">
      <h2 className="ui-title">{title}</h2>
      <div className="ui-meta whitespace-normal! overflow-visible! space-y-2">{children}</div>
    </section>
  );
}
