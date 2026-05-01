'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { loginSchema, SignInFormValues } from '@/features/auth/lib/schemas';
import { useSignInMutation } from '@/features/auth/model/use-sigin';
import { AuthCard } from '@/features/auth/ui/shared/auth-card';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { routes } from '@/shared/router/routes';
import { Button } from '@/shared/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

export default function SignInForm() {
  const router = useRouter();
  const { mutate, isPending } = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });

  const onSubmit = (data: SignInFormValues) => {
    mutate(data, {
      onSuccess: () => router.push(routes.students),
      onError: (error) => {
        toast.error('Couldn’t sign in', { description: getErrorMessage(error) });
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
            <Input {...register('password')} type="password" autoComplete="current-password" />
            {errors.password ? (
              <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
            ) : (
              <FieldDescription>Must be at least 8 characters.</FieldDescription>
            )}
          </Field>
        </div>

        <Button type="submit" disabled={isPending} size="lg" className="w-full">
          {isPending ? 'Signing in…' : 'Continue'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{' '}
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
