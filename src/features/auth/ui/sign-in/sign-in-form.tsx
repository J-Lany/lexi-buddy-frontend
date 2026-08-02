'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
  loginSchema,
  SignInFormValues,
} from '@/features/auth/lib/schemas';
import { useForgotPasswordMutation } from '@/features/auth/model/use-forgot-password';
import { useSignInMutation } from '@/features/auth/model/use-sigin';
import { AuthCard } from '@/features/auth/ui/shared/auth-card';
import { getErrorI18nKey } from '@/shared/api';
import { useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';
import { Button } from '@/shared/ui/button';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

export default function SignInForm() {
  const router = useRouter();
  const { t } = useI18n();
  const { mutate, isPending } = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'forgot'>('signin');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });

  const onSubmit = (data: SignInFormValues) => {
    setAuthError(null);
    mutate(data, {
      onSuccess: () => router.push(routes.students),
      onError: (error) => {
        setAuthError(t(getErrorI18nKey(error)));
      },
    });
  };

  if (mode === 'forgot') {
    return (
      <AuthCard
        title={t('auth.forgotPassword.pageTitle')}
        subtitle={t('auth.forgotPassword.pageSubtitle')}
      >
        <ForgotPasswordForm onBack={() => setMode('signin')} />
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to continue.">
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
        noValidate
      >
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              {...register('email')}
              inputMode="email"
              autoComplete="email"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
            )}
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel>Password</FieldLabel>
              <button
                type="button"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMode('forgot')}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
            )}
          </Field>
        </div>

        {authError && (
          <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {authError}
          </p>
        )}

        <Button type="submit" disabled={isPending} size="lg" className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            'Continue'
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href={routes.register}
            className="font-semibold text-primary hover:underline transition-colors"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

function ForgotPasswordForm({ onBack }: { onBack: () => void }) {
  const { t } = useI18n();
  const { mutate, isPending } = useForgotPasswordMutation();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    setError(null);
    mutate(data, {
      // The backend always responds 202 { ok: true } whether or not the
      // account exists — this neutral success state must never differ based
      // on account existence.
      onSuccess: () => setSent(true),
      onError: (err) => setError(t(getErrorI18nKey(err))),
    });
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-7 w-7 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{t('auth.forgotPassword.successTitle')}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t('auth.forgotPassword.successText')}
          </p>
        </div>
        <button
          type="button"
          className="mt-2 text-sm font-medium text-primary hover:underline transition-colors"
          onClick={onBack}
        >
          {t('auth.forgotPassword.backToSignIn')}
        </button>
      </div>
    );
  }

  return (
    <form
      className="flex w-full flex-col gap-6"
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      noValidate
    >
      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel>{t('auth.forgotPassword.emailLabel')}</FieldLabel>
          <Input
            {...register('email')}
            inputMode="email"
            autoComplete="email"
            placeholder={t('auth.forgotPassword.emailPlaceholder')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive">
              {t('auth.forgotPassword.emailInvalidError')}
            </p>
          )}
        </Field>
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" disabled={isPending} size="lg" className="w-full">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('auth.forgotPassword.submitPending')}
          </>
        ) : (
          t('auth.forgotPassword.submitButton')
        )}
      </Button>

      <button
        type="button"
        className="text-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        onClick={onBack}
      >
        {t('auth.forgotPassword.backToSignIn')}
      </button>
    </form>
  );
}
