import { en, es, kz, ru } from '../locales';

const LOCALES = { en, ru, es, kz } as const;

const SIGN_UP_CONSENT_KEYS = [
  'consentSentence',
  'consentTermsLabel',
  'consentPrivacyLabel',
  'consentPdnLabel',
  'consentError',
] as const;

const SIGN_UP_FORM_KEYS = [
  'pageTitle',
  'pageSubtitle',
  'emailLabel',
  'emailPlaceholder',
  'passwordLabel',
  'confirmPasswordLabel',
  'showPasswordAriaLabel',
  'hidePasswordAriaLabel',
  'submitButton',
  'submitPending',
  'alreadyHaveAccount',
  'signInLink',
  'successToastTitle',
  'successToastDescription',
  'emailInvalidError',
  'passwordTooShortError',
  'passwordMismatchError',
  'confirmModalTitle',
  'confirmModalDescription',
  'confirmModalTypoQuestion',
  'confirmModalEditEmail',
  'confirmModalCta',
  'confirmModalPending',
] as const;

const LEGAL_NAV_KEYS = ['ariaLabel', 'privacy', 'terms', 'cookiePolicy', 'pdnConsent'] as const;

const LEGAL_PAGE_TITLE_KEYS = [
  'privacyTitle',
  'termsTitle',
  'cookiePolicyTitle',
  'pdnConsentTitle',
] as const;

describe('locale coverage — signup consent block', () => {
  it.each(Object.keys(LOCALES))('%s provides every consent key as a non-empty string', (name) => {
    const dict = LOCALES[name as keyof typeof LOCALES];
    for (const key of SIGN_UP_CONSENT_KEYS) {
      const value = dict.auth.signUp[key];
      expect(typeof value).toBe('string');
      expect(value.trim().length).toBeGreaterThan(0);
    }
  });

  it('every non-Russian locale states the sentence using all three link tokens in order', () => {
    for (const name of ['en', 'es', 'kz'] as const) {
      const sentence = LOCALES[name].auth.signUp.consentSentence;
      const termsIndex = sentence.indexOf('{{terms}}');
      const privacyIndex = sentence.indexOf('{{privacy}}');
      const pdnIndex = sentence.indexOf('{{pdn}}');
      expect(termsIndex).toBeGreaterThan(-1);
      expect(privacyIndex).toBeGreaterThan(termsIndex);
      expect(pdnIndex).toBeGreaterThan(privacyIndex);
    }
  });

  it('the Kazakh consent sentence does not contain the grammatically broken double "мен"', () => {
    // The previous wording was "... {{terms}} және {{privacy}} мен таныстым",
    // where a stray "мен" (a leftover instrumental postposition) followed
    // the second link with no grammatical function.
    expect(kz.auth.signUp.consentSentence).not.toMatch(/\{\{privacy\}\}\s+мен\s+таныстым/);
  });

  it('the Kazakh consent sentence is exactly the corrected, natural wording', () => {
    expect(kz.auth.signUp.consentSentence).toBe(
      'Маған 18 жас толды. Мен {{terms}} және {{privacy}} құжаттарымен таныстым және оларға келісемін, сондай-ақ {{pdn}} келісім беремін.',
    );
  });
});

describe('locale coverage — full signup form', () => {
  it.each(Object.keys(LOCALES))(
    '%s provides every signup form key as a non-empty string',
    (name) => {
      const dict = LOCALES[name as keyof typeof LOCALES];
      for (const key of SIGN_UP_FORM_KEYS) {
        const value = dict.auth.signUp[key];
        expect(typeof value).toBe('string');
        expect(value.trim().length).toBeGreaterThan(0);
      }
    },
  );
});

describe('locale coverage — legal document navigation', () => {
  it.each(Object.keys(LOCALES))(
    '%s provides every legal nav label as a non-empty string',
    (name) => {
      const dict = LOCALES[name as keyof typeof LOCALES];
      for (const key of LEGAL_NAV_KEYS) {
        const value = dict.legal.nav[key];
        expect(typeof value).toBe('string');
        expect(value.trim().length).toBeGreaterThan(0);
      }
    },
  );

  it.each(Object.keys(LOCALES))('%s provides a non-empty russianOnlyNotice', (name) => {
    const dict = LOCALES[name as keyof typeof LOCALES];
    expect(dict.legal.russianOnlyNotice.trim().length).toBeGreaterThan(0);
  });

  it.each(Object.keys(LOCALES))('%s provides a non-empty officialRussianTextLabel', (name) => {
    const dict = LOCALES[name as keyof typeof LOCALES];
    expect(dict.legal.officialRussianTextLabel.trim().length).toBeGreaterThan(0);
  });

  it.each(Object.keys(LOCALES))(
    '%s provides every legal page title as a non-empty string',
    (name) => {
      const dict = LOCALES[name as keyof typeof LOCALES];
      for (const key of LEGAL_PAGE_TITLE_KEYS) {
        const value = dict.legal.pages[key];
        expect(typeof value).toBe('string');
        expect(value.trim().length).toBeGreaterThan(0);
      }
    },
  );
});
