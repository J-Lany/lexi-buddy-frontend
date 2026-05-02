'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { loginSchema, SignInFormValues } from '@/features/auth/lib/schemas';
import { useSignInMutation } from '@/features/auth/model/use-sigin';
import { AuthCard } from '@/features/auth/ui/shared/auth-card';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { routes } from '@/shared/router/routes';
import { Button } from '@/shared/ui/button';
import { Field, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

export default function SignInForm() {
  const router = useRouter();
  const { mutate, isPending } = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

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
        setAuthError(getErrorMessage(error));
      },
    });
  };

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
            <FieldLabel>Password</FieldLabel>
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
