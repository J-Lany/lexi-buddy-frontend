'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SignUpFormValues, signupSchema } from '@/features/auth/lib/schemas';
import { useSignupMutation } from '@/features/auth/model/use-signup';
import { AuthCard } from '@/features/auth/ui/shared/auth-card';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { routes } from '@/shared/router/routes';
import { Button } from '@/shared/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();
  const { mutate, isPending } = useSignupMutation();

  const onSubmit = (data: SignUpFormValues) => {
    const { email, password } = data;
    const payload = { email, password };
    mutate(payload, {
      onSuccess: () => {
        toast.success('Account created 🎉', {
          description: 'Check your email to activate your account.',
        });
        router.push(routes.login);
      },
      onError: (error) => {
        toast.error('Something went wrong', { description: getErrorMessage(error) });
      },
    });
  };

  return (
    <AuthCard
      title="Create an account"
      subtitle="Enter your information below to create your account."
    >
      <form className="flex w-full flex-col gap-6" onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
        <div className="flex flex-col gap-4">
          <Field>
            <FieldLabel className="text-[13px] font-medium text-muted-foreground">Email</FieldLabel>
            <Input
              {...register('email')}
              placeholder="m@example.com"
              autoComplete="email"
              className="h-11 rounded-2xl"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
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
          disabled={isPending}
          className="h-11 w-full rounded-2xl text-[15px] font-semibold"
        >
          {isPending ? 'Creating…' : 'Create Account'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href={routes.login} className="underline font-medium text-primary">
            Sign in
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}
