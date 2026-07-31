import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { HttpError } from '@/shared/api';
import { I18nProvider } from '@/shared/i18n';

import SignInForm from '../sign-in-form';

const mutate = jest.fn();
const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

jest.mock('@/features/auth/model/use-sigin', () => ({
  useSignInMutation: () => ({ mutate, isPending: false }),
}));

const forgotPasswordMutate = jest.fn();

jest.mock('@/features/auth/model/use-forgot-password', () => ({
  useForgotPasswordMutation: () => ({ mutate: forgotPasswordMutate, isPending: false }),
}));

function renderSignInForm() {
  return render(
    <I18nProvider>
      <SignInForm />
    </I18nProvider>,
  );
}

async function submitAndGetOnError() {
  fireEvent.change(screen.getByPlaceholderText('name@example.com'), {
    target: { value: 'teacher@example.com' },
  });
  fireEvent.change(document.querySelector('input[autocomplete="current-password"]')!, {
    target: { value: 'wrong-password' },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

  await waitFor(() => expect(mutate).toHaveBeenCalledTimes(1));
  const [, callbacks] = mutate.mock.calls[0] as [unknown, { onError: (e: unknown) => void }];
  return callbacks;
}

describe('SignInForm — API error handling (real backend error codes, no login-specific override)', () => {
  beforeEach(() => {
    mutate.mockClear();
  });

  it('shows "Incorrect email or password." when the backend returns code: AUTH_INVALID_CREDENTIALS', async () => {
    renderSignInForm();
    const callbacks = await submitAndGetOnError();

    const backend401 = {
      isAxiosError: true,
      message: 'Request failed with status code 401',
      response: { status: 401, data: { code: 'AUTH_INVALID_CREDENTIALS' } },
      config: { headers: {} },
    };
    act(() => callbacks.onError(backend401));

    const error = await screen.findByText('Incorrect email or password.');
    expect(error).toBeInTheDocument();
    expect(screen.queryByText(/Request failed with status code/)).toBeNull();
  });

  it('ignores a backend `message` even when the correct code is present', async () => {
    renderSignInForm();
    const callbacks = await submitAndGetOnError();

    act(() =>
      callbacks.onError({
        isAxiosError: true,
        message: 'Request failed with status code 401',
        response: {
          status: 401,
          data: {
            code: 'AUTH_INVALID_CREDENTIALS',
            message: 'raw backend text that must never render',
          },
        },
        config: { headers: {} },
      }),
    );

    expect(await screen.findByText('Incorrect email or password.')).toBeInTheDocument();
    expect(screen.queryByText(/raw backend text/)).toBeNull();
  });

  it('shows the generic "sign in to continue" text — NOT invalid-credentials — for a legacy 401 with no backend code', async () => {
    renderSignInForm();
    const callbacks = await submitAndGetOnError();

    const legacy401NoCode = {
      isAxiosError: true,
      message: 'Request failed with status code 401',
      response: { status: 401 },
      config: { headers: {} },
    };
    act(() => callbacks.onError(legacy401NoCode));

    expect(await screen.findByText('You need to sign in to continue.')).toBeInTheDocument();
    expect(screen.queryByText('Incorrect email or password.')).toBeNull();
  });

  it('shows the same generic text for an already-normalized HttpError(401) with no code', async () => {
    renderSignInForm();
    const callbacks = await submitAndGetOnError();
    act(() => callbacks.onError(new HttpError('unauthorized', { status: 401 })));

    expect(await screen.findByText('You need to sign in to continue.')).toBeInTheDocument();
  });

  it('shows the same invalid-credentials text for an already-normalized HttpError carrying code: AUTH_INVALID_CREDENTIALS', async () => {
    renderSignInForm();
    const callbacks = await submitAndGetOnError();
    act(() =>
      callbacks.onError(
        new HttpError('unauthorized', { status: 401, code: 'AUTH_INVALID_CREDENTIALS' }),
      ),
    );

    expect(await screen.findByText('Incorrect email or password.')).toBeInTheDocument();
  });

  it('shows a safe generic server-error text for an unrecognized backend code with a 500 status', async () => {
    renderSignInForm();
    const callbacks = await submitAndGetOnError();

    act(() =>
      callbacks.onError({
        isAxiosError: true,
        message: 'Request failed with status code 500',
        response: { status: 500, data: { code: 'SOME_FUTURE_UNKNOWN_CODE' } },
        config: { headers: {} },
      }),
    );

    expect(
      await screen.findByText('Something went wrong on our end. Please try again later.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('SOME_FUTURE_UNKNOWN_CODE')).toBeNull();
  });

  it('shows a network-error message when the request never reaches the server', async () => {
    renderSignInForm();
    const callbacks = await submitAndGetOnError();
    act(() =>
      callbacks.onError({
        isAxiosError: true,
        message: 'Network Error',
        code: 'ERR_NETWORK',
        config: { headers: {} },
      }),
    );

    expect(
      await screen.findByText(
        'Connection problem. Please check your internet connection and try again.',
      ),
    ).toBeInTheDocument();
  });
});

describe('SignInForm — forgot password (public flow)', () => {
  beforeEach(() => {
    forgotPasswordMutate.mockClear();
  });

  function switchToForgotMode() {
    fireEvent.click(screen.getByRole('button', { name: 'Forgot password?' }));
  }

  it('sends only { email } — no password or confirmPassword fields exist on the form', async () => {
    renderSignInForm();
    switchToForgotMode();

    // Only one text/email input should be present in forgot mode — no
    // password/confirmPassword inputs from the old authorized-flow form.
    expect(document.querySelectorAll('input')).toHaveLength(1);
    expect(document.querySelector('input[autocomplete="new-password"]')).toBeNull();
    expect(document.querySelector('input[autocomplete="current-password"]')).toBeNull();

    fireEvent.change(screen.getByPlaceholderText('name@example.com'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send reset link' }));

    await waitFor(() => expect(forgotPasswordMutate).toHaveBeenCalledTimes(1));
    const [payload] = forgotPasswordMutate.mock.calls[0] as [Record<string, unknown>, unknown];
    expect(payload).toEqual({ email: 'user@example.com' });
  });

  it('shows a neutral success state after the backend responds — identical regardless of whether the account exists', async () => {
    renderSignInForm();
    switchToForgotMode();

    fireEvent.change(screen.getByPlaceholderText('name@example.com'), {
      target: { value: 'anyone@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send reset link' }));

    await waitFor(() => expect(forgotPasswordMutate).toHaveBeenCalledTimes(1));
    const [, callbacks] = forgotPasswordMutate.mock.calls[0] as [
      unknown,
      { onSuccess: () => void },
    ];
    act(() => callbacks.onSuccess());

    expect(await screen.findByText('Check your email')).toBeInTheDocument();
    // The success copy never mentions or varies by the submitted email —
    // it must read the same whether or not an account exists.
    expect(screen.queryByText('anyone@example.com')).toBeNull();
  });

  it('shows a safe, localized message and lets the user retry on a network error', async () => {
    renderSignInForm();
    switchToForgotMode();

    fireEvent.change(screen.getByPlaceholderText('name@example.com'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send reset link' }));

    await waitFor(() => expect(forgotPasswordMutate).toHaveBeenCalledTimes(1));
    const [, callbacks] = forgotPasswordMutate.mock.calls[0] as [
      unknown,
      { onError: (e: unknown) => void },
    ];
    act(() =>
      callbacks.onError({
        isAxiosError: true,
        message: 'Network Error',
        code: 'ERR_NETWORK',
        config: { headers: {} },
      }),
    );

    expect(
      await screen.findByText(
        'Connection problem. Please check your internet connection and try again.',
      ),
    ).toBeInTheDocument();
    // Form stays visible/editable so the user can retry the submission.
    expect(screen.getByRole('button', { name: 'Send reset link' })).toBeEnabled();
  });
});
