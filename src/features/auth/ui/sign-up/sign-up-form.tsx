'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  SignUpFormValues,
  signupSchema,
  TEACHER_CONSENT_VERSION,
} from '@/features/auth/lib/schemas';
import { useSignupMutation } from '@/features/auth/model/use-signup';
import { AuthCard } from '@/features/auth/ui/shared/auth-card';
import { EmailConfirmModal } from '@/features/auth/ui/sign-up/email-confirm-modal';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { routes } from '@/shared/router/routes';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

type PendingSignUp = {
  email: string;
  password: string;
  consentAccepted: boolean;
  consentVersion: number;
};

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [pendingData, setPendingData] = useState<PendingSignUp | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { consentAccepted: false },
  });
  const router = useRouter();
  const { mutate, isPending } = useSignupMutation();

  const onSubmit = (data: SignUpFormValues) => {
    setAuthError(null);
    setPendingData({
      email: data.email,
      password: data.password,
      consentAccepted: data.consentAccepted,
      consentVersion: TEACHER_CONSENT_VERSION,
    });
  };

  const handleConfirm = () => {
    if (!pendingData) return;
    mutate(pendingData, {
      onSuccess: () => {
        toast.success('Account created', {
          description: 'Check your email to activate your account.',
        });
        router.push(routes.login);
      },
      onError: (error) => {
        setPendingData(null);
        setAuthError(getErrorMessage(error));
      },
    });
  };

  return (
    <>
      <EmailConfirmModal
        email={pendingData?.email ?? ''}
        open={pendingData !== null}
        isPending={isPending}
        onConfirm={handleConfirm}
        onBack={() => setPendingData(null)}
      />
      <AuthCard title="Create an account" subtitle="Enter your details to create a free account.">
        <form
          className="flex w-full flex-col gap-6"
          onSubmit={(e) => void handleSubmit(onSubmit)(e)}
          noValidate
        >
          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...register('email')}
                placeholder="name@example.com"
                autoComplete="email"
                inputMode="email"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
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
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <div className="relative">
                <Input
                  {...register('confirmPassword')}
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
              )}
            </Field>
          </div>

          <Controller
            name="consentAccepted"
            control={control}
            render={({ field }) => (
              <div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consentAccepted"
                    ref={field.ref}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                    onBlur={field.onBlur}
                    aria-invalid={!!errors.consentAccepted}
                    aria-describedby={errors.consentAccepted ? 'consentAccepted-error' : undefined}
                    className="mt-0.5"
                  />
                  <label htmlFor="consentAccepted" className="text-sm text-muted-foreground">
                    Мне исполнилось 18 лет. Я ознакомлен(а) и согласен(на) с{' '}
                    <Link
                      href={routes.terms}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Пользовательским соглашением
                    </Link>{' '}
                    и{' '}
                    <Link
                      href={routes.privacy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Политикой конфиденциальности
                    </Link>{' '}
                    и даю согласие на{' '}
                    <Link
                      href={routes.pdnConsent}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      обработку моих персональных данных
                    </Link>
                  </label>
                </div>
                {errors.consentAccepted && (
                  <p id="consentAccepted-error" className="text-sm text-destructive mt-1">
                    {errors.consentAccepted.message}
                  </p>
                )}
              </div>
            )}
          />

          {authError && (
            <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {authError}
            </p>
          )}

          <Button type="submit" disabled={isPending} size="lg" className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating…
              </>
            ) : (
              'Create Account'
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href={routes.login}
              className="font-semibold text-primary hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </form>
      </AuthCard>
    </>
  );
}
