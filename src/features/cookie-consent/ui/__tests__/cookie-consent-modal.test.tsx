import { fireEvent, render, screen } from '@testing-library/react';

import { I18nProvider } from '@/shared/i18n';
import { LOCALE_STORAGE_KEY } from '@/shared/i18n/locale-storage';
import { getConsent } from '@/shared/lib/cookie-consent';

import { CookieConsentModal } from '../cookie-consent-modal';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

function renderModal() {
  return render(
    <I18nProvider>
      <CookieConsentModal />
    </I18nProvider>,
  );
}

describe('CookieConsentModal — locale persistence wiring', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows the banner when no consent has been recorded', () => {
    renderModal();
    expect(screen.getByText('Cookies on Lexi Buddy')).toBeInTheDocument();
  });

  it('"Accept all" grants functional consent and persists the current locale', () => {
    renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));

    expect(getConsent()?.categories.functional).toBe(true);
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en');
  });

  it('"Necessary only" rejects functional consent and clears any stored locale', () => {
    renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Necessary only' }));

    expect(getConsent()?.categories.functional).toBe(false);
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull();
  });

  it('enabling functional consent via Settings persists the current locale without a reload', () => {
    renderModal();

    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Functional' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save choices' }));

    expect(getConsent()?.categories.functional).toBe(true);
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en');
  });

  it('does not close and shows an error toast when saving consent fails', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    renderModal();
    fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));

    // Banner is still open — the failed save must not close the dialog.
    expect(screen.getByText('Cookies on Lexi Buddy')).toBeInTheDocument();

    spy.mockRestore();
  });
});
