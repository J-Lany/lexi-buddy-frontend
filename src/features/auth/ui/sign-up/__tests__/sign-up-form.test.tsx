import { fireEvent, render, screen } from '@testing-library/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { I18nProvider, type Locale, useI18n } from '@/shared/i18n';

import SignUpForm from '../sign-up-form';

const mutate = jest.fn();
const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

jest.mock('@/features/auth/model/use-signup', () => ({
  useSignupMutation: () => ({ mutate, isPending: false }),
}));

jest.mock('sonner', () => ({
  toast: { success: jest.fn() },
}));

function LocaleSetter({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const { setLocale } = useI18n();
  useEffect(() => {
    setLocale(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

function renderSignUpForm(locale: Locale = 'en') {
  return render(
    <I18nProvider>
      <LocaleSetter locale={locale}>
        <SignUpForm />
      </LocaleSetter>
    </I18nProvider>,
  );
}

function fillValidForm(container: HTMLElement) {
  const passwordInputs = container.querySelectorAll<HTMLInputElement>('input[type="password"]');
  fireEvent.change(screen.getByPlaceholderText('name@example.com'), {
    target: { value: 'teacher@example.com' },
  });
  fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
  fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('checkbox'));
}

const CYRILLIC = /[Ѐ-ӿ]/;

describe('SignUpForm — consent checkbox', () => {
  beforeEach(() => {
    mutate.mockClear();
    push.mockClear();
    (toast.success as jest.Mock).mockClear();
  });

  it('is unchecked by default', () => {
    renderSignUpForm();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders the English consent sentence with no Russian text (default/English locale)', () => {
    renderSignUpForm('en');

    const label = screen.getByText(/I am 18 years of age or older/);
    expect(label.textContent).toBe(
      'I am 18 years of age or older. I have read and agree to the ' +
        'Terms of Use and the Privacy Policy, and I give my consent to the ' +
        'processing of my personal data.',
    );
    expect(label.textContent).not.toMatch(CYRILLIC);
  });

  it('links to Terms, Privacy, and PDN consent pages, opening in a new tab (English)', () => {
    renderSignUpForm('en');

    const terms = screen.getByRole('link', { name: 'Terms of Use' });
    const privacy = screen.getByRole('link', { name: 'Privacy Policy' });
    const pdn = screen.getByRole('link', { name: 'processing of my personal data' });

    expect(terms).toHaveAttribute('href', '/terms');
    expect(privacy).toHaveAttribute('href', '/privacy');
    expect(pdn).toHaveAttribute('href', '/pdn-consent');

    for (const link of [terms, privacy, pdn]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('renders the approved Russian consent wording verbatim when the locale is Russian', () => {
    renderSignUpForm('ru');

    const label = screen.getByText(/Мне исполнилось 18 лет/);
    expect(label.textContent).toBe(
      'Мне исполнилось 18 лет. Я ознакомлен(а) и согласен(на) с ' +
        'Пользовательским соглашением и Политикой конфиденциальности и даю согласие на ' +
        'обработку моих персональных данных',
    );
  });

  it('blocks submission and shows an accessible, localized error when unchecked', async () => {
    const { container } = renderSignUpForm('en');
    const passwordInputs = container.querySelectorAll<HTMLInputElement>('input[type="password"]');

    fireEvent.change(screen.getByPlaceholderText('name@example.com'), {
      target: { value: 'teacher@example.com' },
    });
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    const error = await screen.findByText('You must accept the terms to continue registration');
    expect(error).toHaveAttribute('id', 'consentAccepted-error');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute('aria-describedby', 'consentAccepted-error');

    expect(mutate).not.toHaveBeenCalled();
  });

  it('has no aria-describedby while valid', () => {
    renderSignUpForm();
    expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-describedby');
  });

  it('does not toggle the checkbox when a legal link inside the label is clicked (jsdom)', () => {
    renderSignUpForm('en');
    const checkbox = screen.getByRole('checkbox');
    const termsLink = screen.getByRole('link', { name: 'Terms of Use' });

    expect(checkbox).not.toBeChecked();
    fireEvent.click(termsLink);
    expect(checkbox).not.toBeChecked();
  });

  it('toggles the checkbox when the plain label text is clicked', () => {
    renderSignUpForm('en');
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText(/I am 18 years of age or older/);

    expect(checkbox).not.toBeChecked();
    fireEvent.click(label);
    expect(checkbox).toBeChecked();
  });
});

describe('SignUpForm — full-page localization', () => {
  beforeEach(() => {
    mutate.mockClear();
    push.mockClear();
    (toast.success as jest.Mock).mockClear();
  });

  it('EN: renders no Cyrillic characters anywhere on the page', () => {
    const { container } = renderSignUpForm('en');
    expect(container.textContent ?? '').not.toMatch(CYRILLIC);
  });

  it('EN: every user-facing label is in English', () => {
    renderSignUpForm('en');
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('Enter your details to create a free account.')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('RU: every user-facing label is in Russian, with no leftover hardcoded English', () => {
    renderSignUpForm('ru');
    // "Создать аккаунт" is used for both the page title and the submit button in
    // Russian (unlike English, which distinguishes "Create an account" / "Create
    // Account"), so disambiguate by role.
    expect(screen.getByRole('heading', { name: 'Создать аккаунт' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Создать аккаунт' })).toBeInTheDocument();
    expect(screen.getByText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Повторите пароль')).toBeInTheDocument();
    expect(screen.getByText('Уже есть аккаунт?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Войти' })).toBeInTheDocument();

    expect(screen.queryByText('Create Account')).toBeNull();
    expect(screen.queryByText('Password')).toBeNull();
    expect(screen.queryByText('Confirm Password')).toBeNull();
    expect(screen.queryByText('Already have an account?')).toBeNull();
    expect(screen.queryByRole('link', { name: 'Sign in' })).toBeNull();
  });

  it('ES: key labels match the Spanish locale', () => {
    renderSignUpForm('es');
    expect(screen.getByText('Crear una cuenta')).toBeInTheDocument();
    expect(screen.getByText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Crear cuenta' })).toBeInTheDocument();
    expect(screen.getByText('¿Ya tienes una cuenta?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Iniciar sesión' })).toBeInTheDocument();
  });

  it('KZ: key labels match the Kazakh locale', () => {
    renderSignUpForm('kz');
    // "Тіркелгі жасау" is used for both the page title and the submit button.
    expect(screen.getByRole('heading', { name: 'Тіркелгі жасау' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Тіркелгі жасау' })).toBeInTheDocument();
    expect(screen.getByText('Құпия сөз')).toBeInTheDocument();
    expect(screen.getByText('Құпия сөзді қайталаңыз')).toBeInTheDocument();
    expect(screen.getByText('Тіркелгіңіз бар ма?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Кіру' })).toBeInTheDocument();
  });

  it('localizes the show/hide password aria-labels and toggles between them', () => {
    renderSignUpForm('en');
    const [showButton] = screen.getAllByRole('button', { name: 'Show password' });
    expect(showButton).toBeInTheDocument();

    fireEvent.click(showButton);
    expect(screen.getAllByRole('button', { name: 'Hide password' })[0]).toBeInTheDocument();
  });

  it('keeps both password-visibility toggles keyboard-focusable with localized accessible names', () => {
    renderSignUpForm('en');
    const toggles = screen.getAllByRole('button', { name: 'Show password' });
    expect(toggles).toHaveLength(2);
    for (const toggle of toggles) {
      // A normal, focusable button never carries tabindex="-1".
      expect(toggle).not.toHaveAttribute('tabindex', '-1');
      expect(toggle).toHaveAccessibleName('Show password');
    }
  });

  it('password-visibility toggles have localized accessible names in Russian too', () => {
    renderSignUpForm('ru');
    const toggles = screen.getAllByRole('button', { name: 'Показать пароль' });
    expect(toggles).toHaveLength(2);
    for (const toggle of toggles) {
      expect(toggle).not.toHaveAttribute('tabindex', '-1');
    }
  });

  it('shows a localized email validation error', async () => {
    renderSignUpForm('en');
    fireEvent.change(screen.getByPlaceholderText('name@example.com'), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument();
  });

  it('shows a localized password-too-short error', async () => {
    const { container } = renderSignUpForm('en');
    const passwordInputs = container.querySelectorAll<HTMLInputElement>('input[type="password"]');
    fireEvent.change(passwordInputs[0], { target: { value: 'short' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(
      await screen.findByText('Password must be at least 8 characters long'),
    ).toBeInTheDocument();
  });

  it('shows a localized password-mismatch error', async () => {
    const { container } = renderSignUpForm('en');
    const passwordInputs = container.querySelectorAll<HTMLInputElement>('input[type="password"]');
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'different123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument();
  });

  it('shows a localized confirm-email modal and success toast after confirming', async () => {
    const { container } = renderSignUpForm('en');
    fillValidForm(container);
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(await screen.findByText('Confirm your email')).toBeInTheDocument();
    expect(screen.getByText("We'll send the activation link to this address")).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: "Yes, that's correct" }));

    expect(mutate).toHaveBeenCalledTimes(1);
    const [, callbacks] = mutate.mock.calls[0] as [
      unknown,
      { onSuccess: () => void; onError: (e: unknown) => void },
    ];
    callbacks.onSuccess();

    expect(toast.success).toHaveBeenCalledWith('Account created', {
      description: 'Check your email to activate your account.',
    });
    expect(push).toHaveBeenCalledWith('/login');
  });
});
