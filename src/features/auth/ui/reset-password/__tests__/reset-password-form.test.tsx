import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { I18nProvider } from '@/shared/i18n';

import { ResetPasswordForm } from '../reset-password-form';

const push = jest.fn();
const mutate = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

let mockIsSuccess = false;

jest.mock('@/features/auth/model/use-reset-password', () => ({
  useResetPasswordMutation: () => ({
    mutate,
    isPending: false,
    get isSuccess() {
      return mockIsSuccess;
    },
  }),
}));

function renderResetPasswordForm(token = 'a-valid-token') {
  return render(
    <I18nProvider>
      <ResetPasswordForm token={token} />
    </I18nProvider>,
  );
}

function fillAndSubmit(password: string, confirmPassword: string) {
  fireEvent.change(document.querySelector('input[autocomplete="new-password"]')!, {
    target: { value: password },
  });
  const confirmInputs = document.querySelectorAll('input[autocomplete="new-password"]');
  fireEvent.change(confirmInputs[1], { target: { value: confirmPassword } });
  fireEvent.click(screen.getByRole('button', { name: 'Reset password' }));
}

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    mutate.mockClear();
    push.mockClear();
    mockIsSuccess = false;
  });

  it('reads the token from props and does not call the mutation on mount', () => {
    renderResetPasswordForm('token-from-url');
    expect(mutate).not.toHaveBeenCalled();
  });

  it('shows an invalid-link error state immediately when the token is empty — no request is sent', () => {
    renderResetPasswordForm('');

    expect(screen.getByText('This link is invalid.')).toBeInTheDocument();
    expect(mutate).not.toHaveBeenCalled();
    // No password form should be rendered in this state.
    expect(document.querySelector('input[autocomplete="new-password"]')).toBeNull();
  });

  it('submits { token, password, confirmPassword } on a valid submit', async () => {
    renderResetPasswordForm('token-abc');
    fillAndSubmit('NewPassword1!', 'NewPassword1!');

    await waitFor(() => expect(mutate).toHaveBeenCalledTimes(1));
    const [payload] = mutate.mock.calls[0] as [Record<string, unknown>, unknown];
    expect(payload).toEqual({
      token: 'token-abc',
      password: 'NewPassword1!',
      confirmPassword: 'NewPassword1!',
    });
  });

  it('does not submit when password and confirmPassword do not match (client-side validation)', async () => {
    renderResetPasswordForm('token-abc');
    fillAndSubmit('NewPassword1!', 'Different1!');

    await screen.findByText('Passwords do not match');
    expect(mutate).not.toHaveBeenCalled();
  });

  it('shows a localized message for AUTH_INVALID_TOKEN, without the raw backend message', async () => {
    renderResetPasswordForm('token-abc');
    fillAndSubmit('NewPassword1!', 'NewPassword1!');

    await waitFor(() => expect(mutate).toHaveBeenCalledTimes(1));
    const [, callbacks] = mutate.mock.calls[0] as [unknown, { onError: (e: unknown) => void }];
    act(() =>
      callbacks.onError({
        isAxiosError: true,
        message: 'Request failed with status code 400',
        response: {
          status: 400,
          data: { code: 'AUTH_INVALID_TOKEN', message: 'raw backend text' },
        },
        config: { headers: {} },
      }),
    );

    expect(await screen.findByText('This link is invalid.')).toBeInTheDocument();
    expect(screen.queryByText(/raw backend text/)).toBeNull();
  });

  it('shows a localized message for AUTH_TOKEN_EXPIRED', async () => {
    renderResetPasswordForm('token-abc');
    fillAndSubmit('NewPassword1!', 'NewPassword1!');

    await waitFor(() => expect(mutate).toHaveBeenCalledTimes(1));
    const [, callbacks] = mutate.mock.calls[0] as [unknown, { onError: (e: unknown) => void }];
    act(() =>
      callbacks.onError({
        isAxiosError: true,
        message: 'Request failed with status code 400',
        response: { status: 400, data: { code: 'AUTH_TOKEN_EXPIRED' } },
        config: { headers: {} },
      }),
    );

    expect(await screen.findByText('This link has expired.')).toBeInTheDocument();
  });

  it('never renders a raw Axios/backend error message', async () => {
    renderResetPasswordForm('token-abc');
    fillAndSubmit('NewPassword1!', 'NewPassword1!');

    await waitFor(() => expect(mutate).toHaveBeenCalledTimes(1));
    const [, callbacks] = mutate.mock.calls[0] as [unknown, { onError: (e: unknown) => void }];
    act(() =>
      callbacks.onError({
        isAxiosError: true,
        message: 'Request failed with status code 500',
        response: { status: 500, data: { code: 'INTERNAL_ERROR' } },
        config: { headers: {} },
      }),
    );

    await screen.findByText('Something went wrong on our end. Please try again later.');
    expect(screen.queryByText('Request failed with status code 500')).toBeNull();
    expect(screen.queryByText('INTERNAL_ERROR')).toBeNull();
  });

  it('shows a success state with a way to go to login once the reset succeeds', () => {
    mockIsSuccess = true;
    renderResetPasswordForm('token-abc');

    expect(screen.getByText('Password reset')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Go to login' }));
    expect(push).toHaveBeenCalledWith('/login');
  });
});
