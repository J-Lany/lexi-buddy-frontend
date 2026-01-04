'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginFormValues } from '@/features/auth/utils/types';
import { loginSchema } from '@/features/auth/utils/validation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { EAppRoutes } from '@/lib/routes';
import { useSigninMutation } from '@/features/auth/hooks/use-sigin';

export default function LoginFormContent() {
  const router = useRouter();
  const signin = useSigninMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await new Promise<void>((resolve, reject) => {
        signin.mutate(data, {
          onSuccess: () => resolve(),
          onError: (e) => reject(e),
        });
      });

      router.push(EAppRoutes.STUDENTS);
    } catch (e) {
      toast.error('Couldn’t sign in', {
        description: e instanceof Error ? e.message : 'Please try again.',
      });
    }
  };

  return (
    <form className="flex w-full flex-col gap-6 px-1" onSubmit={handleSubmit(onSubmit)} noValidate>
      <header className="space-y-2 text-center">
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight">Welcome back</h1>
        <p className="text-[15px] leading-snug text-muted-foreground">Sign in to continue.</p>
      </header>

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel className="text-[13px] font-medium text-muted-foreground">Email</FieldLabel>
          <Input
            {...register('email')}
            inputMode="email"
            autoComplete="email"
            placeholder="name@example.com"
            className="h-11 rounded-2xl"
          />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </Field>

        <Field>
          <FieldLabel className="text-[13px] font-medium text-muted-foreground">
            Password
          </FieldLabel>
          <Input
            {...register('password')}
            type="password"
            autoComplete="current-password"
            className="h-11 rounded-2xl"
          />
          {errors.password ? (
            <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
          ) : (
            <FieldDescription className="text-xs text-muted-foreground">
              Must be at least 8 characters.
            </FieldDescription>
          )}
        </Field>
      </div>

      <Button
        type="submit"
        disabled={signin.isPending}
        className="h-11 w-full rounded-2xl text-[15px] font-semibold"
      >
        {signin.isPending ? 'Signing in…' : 'Continue'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don’t have an account?{' '}
        <Link href={EAppRoutes.REGISTRATION} className="underline font-semibold text-primary">
          Sign up
        </Link>
      </p>
    </form>
  );
}
