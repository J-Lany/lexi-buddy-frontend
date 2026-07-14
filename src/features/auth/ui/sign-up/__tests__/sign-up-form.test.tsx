import { fireEvent, render, screen } from '@testing-library/react';

import SignUpForm from '../sign-up-form';

const mutate = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/features/auth/model/use-signup', () => ({
  useSignupMutation: () => ({ mutate, isPending: false }),
}));

describe('SignUpForm — consent checkbox', () => {
  beforeEach(() => {
    mutate.mockClear();
  });

  it('is unchecked by default', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('links to Terms, Privacy, and PDN consent pages, opening in a new tab', () => {
    render(<SignUpForm />);

    const terms = screen.getByRole('link', { name: 'Пользовательским соглашением' });
    const privacy = screen.getByRole('link', { name: 'Политикой конфиденциальности' });
    const pdn = screen.getByRole('link', { name: 'обработку моих персональных данных' });

    expect(terms).toHaveAttribute('href', '/terms');
    expect(privacy).toHaveAttribute('href', '/privacy');
    expect(pdn).toHaveAttribute('href', '/pdn-consent');

    for (const link of [terms, privacy, pdn]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('keeps the full approved wording intact', () => {
    render(<SignUpForm />);
    const label = screen.getByText(/Мне исполнилось 18 лет/);
    expect(label.textContent).toBe(
      'Мне исполнилось 18 лет. Я ознакомлен(а) и согласен(на) с ' +
        'Пользовательским соглашением и Политикой конфиденциальности и даю согласие на ' +
        'обработку моих персональных данных',
    );
  });

  it('blocks submission and shows an accessible error when unchecked', async () => {
    const { container } = render(<SignUpForm />);
    const passwordInputs = container.querySelectorAll<HTMLInputElement>('input[type="password"]');

    fireEvent.change(screen.getByPlaceholderText('name@example.com'), {
      target: { value: 'teacher@example.com' },
    });
    fireEvent.change(passwordInputs[0], { target: { value: 'password123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    const error = await screen.findByText(
      'Необходимо принять условия, чтобы продолжить регистрацию',
    );
    expect(error).toHaveAttribute('id', 'consentAccepted-error');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    expect(checkbox).toHaveAttribute('aria-describedby', 'consentAccepted-error');

    expect(mutate).not.toHaveBeenCalled();
  });

  it('has no aria-describedby while valid', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('checkbox')).not.toHaveAttribute('aria-describedby');
  });

  // jsdom's <label for> click-forwarding is a best-effort approximation of real
  // browser behavior — this is signal, not a substitute for the manual browser
  // check called for in the review (see final report).
  it('does not toggle the checkbox when a legal link inside the label is clicked (jsdom)', () => {
    render(<SignUpForm />);
    const checkbox = screen.getByRole('checkbox');
    const termsLink = screen.getByRole('link', { name: 'Пользовательским соглашением' });

    expect(checkbox).not.toBeChecked();
    fireEvent.click(termsLink);
    expect(checkbox).not.toBeChecked();
  });

  it('toggles the checkbox when the plain label text is clicked', () => {
    render(<SignUpForm />);
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText(/Мне исполнилось 18 лет/);

    expect(checkbox).not.toBeChecked();
    fireEvent.click(label);
    expect(checkbox).toBeChecked();
  });
});
