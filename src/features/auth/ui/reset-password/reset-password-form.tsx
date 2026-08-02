'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Eye, EyeOff, Loader2, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ResetPasswordFormValues, resetPasswordSchema } from '@/features/auth/lib/schemas';
import { useResetPasswordMutation } from '@/features/auth/model/use-reset-password';
import { ActivationCard } from '@/features/auth/ui/activate/components/activation-card';
import { AuthCard } from '@/features/auth/ui/shared/auth-card';
import { getErrorI18nKey } from '@/shared/api';
import { useI18n } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

type Props = {
  token: string;
};

export function ResetPasswordForm({ token }: Props) {
  const { t } = useI18n();
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    setAuthError(null);
    mutate(
      { token, password: data.password, confirmPassword: data.confirmPassword },
      {
        onError: (error) => setAuthError(t(getErrorI18nKey(error))),
      },
    );
  };

  if (!token) {
    return (
      <Card className="w-full p-0 md:ui-auth-sheet md:p-10 border-0 shadow-none bg-transparent">
        <div className="flex flex-col items-center gap-6 px-1 text-center">
          <Link href={routes.main} aria-label="Lexi Buddy home">
            <Image
              src="/icon.webp"
              alt="Lexi Buddy"
              width={64}
              height={64}
              priority
              className="select-none"
            />
          </Link>
          <ActivationCard
            icon={<XCircle className="mx-auto h-10 w-10 text-destructive/80" />}
            title={t('auth.resetPassword.errorTitle')}
            subtitle={t('errors.codes.AUTH_INVALID_TOKEN')}
          >
            <div className="pt-2">
              <Button
                onClick={() => router.push(routes.login)}
                className="w-full h-11 text-[15px] font-semibold"
              >
                {t('auth.resetPassword.backToSignIn')}
              </Button>
            </div>
          </ActivationCard>
        </div>
      </Card>
    );
  }

  if (isSuccess) {
    return (
      <Card className="w-full p-0 md:ui-auth-sheet md:p-10 border-0 shadow-none bg-transparent">
        <div className="flex flex-col items-center gap-6 px-1 text-center">
          <Link href={routes.main} aria-label="Lexi Buddy home">
            <Image
              src="/icon.webp"
              alt="Lexi Buddy"
              width={64}
              height={64}
              priority
              className="select-none"
            />
          </Link>
          <ActivationCard
            icon={<CheckCircle className="mx-auto h-10 w-10 text-primary" />}
            title={t('auth.resetPassword.successTitle')}
            subtitle={t('auth.resetPassword.successText')}
          >
            <div className="pt-2">
              <Button
                onClick={() => router.push(routes.login)}
                className="w-full h-11 text-[15px] font-semibold"
              >
                {t('auth.resetPassword.goToLogin')}
              </Button>
            </div>
          </ActivationCard>
        </div>
      </Card>
    );
  }

  return (
    <AuthCard
      title={t('auth.resetPassword.pageTitle')}
      subtitle={t('auth.resetPassword.pageSubtitle')}
    >
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        noValidate
      >
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel>{t('auth.resetPassword.passwordLabel')}</FieldLabel>
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                className="ui-focus absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword
                    ? t('auth.resetPassword.hidePasswordAriaLabel')
                    : t('auth.resetPassword.showPasswordAriaLabel')
                }
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive mt-1">
                {t('auth.resetPassword.passwordTooShortError')}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel>{t('auth.resetPassword.confirmPasswordLabel')}</FieldLabel>
            <div className="relative">
              <Input
                {...register('confirmPassword')}
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                className="pr-10"
              />
              <button
                type="button"
                className="ui-focus absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={
                  showConfirm
                    ? t('auth.resetPassword.hidePasswordAriaLabel')
                    : t('auth.resetPassword.showPasswordAriaLabel')
                }
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-destructive mt-1">
                {t('auth.resetPassword.passwordMismatchError')}
              </p>
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
              {t('auth.resetPassword.submitPending')}
            </>
          ) : (
            t('auth.resetPassword.submitButton')
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          <Link
            href={routes.login}
            className="font-semibold text-primary hover:underline transition-colors"
          >
            {t('auth.resetPassword.backToSignIn')}
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
