'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormValues } from '@/features/auth/utils/types';
import { signupSchema } from '@/features/auth/utils/validation';
import { useSignupMutation } from '@/features/auth/hooks/use-signup';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { EAppRoutes } from '@/lib/routes';

export default function FormContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();
  const signup = useSignupMutation();

  const onSubmit = (data: FormValues) => {
    const { email, password } = data;
    const payload = { email, password };
    signup.mutate(payload, {
      onSuccess: () => {
        toast.success('Account created 🎉', {
          description: 'Check your email to activate your account.',
        });
        router.push(EAppRoutes.LOGIN);
      },
      onError: (error) => {
        toast.error('Something went wrong', { description: error.message });
      },
    });
  };

  return (
    <form className="flex w-full flex-col gap-6 px-1" onSubmit={handleSubmit(onSubmit)}>
      <header className="space-y-2 text-center">
        <h1 className="text-[28px] leading-tight font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-[15px] leading-snug text-muted-foreground">
          Enter your information below to create your account.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel className="text-[13px] font-medium text-muted-foreground">Email</FieldLabel>
          <Input
            {...register('email')}
            placeholder="m@example.com"
            autoComplete="email"
            className="h-11 rounded-2xl"
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </Field>

        <Field>
          <FieldLabel className="text-[13px] font-medium text-muted-foreground">
            Password
          </FieldLabel>
          <Input
            {...register('password')}
            type="password"
            autoComplete="new-password"
            className="h-11 rounded-2xl"
          />
          {errors.password ? (
            <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
          ) : (
            <FieldDescription className="text-xs text-muted-foreground">
              Must be at least 8 characters long.
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel className="text-[13px] font-medium text-muted-foreground">
            Confirm Password
          </FieldLabel>
          <Input
            {...register('confirmPassword')}
            type="password"
            autoComplete="new-password"
            className="h-11 rounded-2xl"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
          )}
        </Field>
      </div>

      <Button
        type="submit"
        disabled={signup.isPending}
        className="h-11 w-full rounded-2xl text-[15px] font-semibold"
      >
        {signup.isPending ? 'Creating…' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href={EAppRoutes.LOGIN} className="underline font-medium text-primary">
          Sign in
        </Link>
      </p>
    </form>
  );
}
