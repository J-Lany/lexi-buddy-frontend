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
    formState: { errors, isSubmitting },
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
    <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Create an account</h2>
        <p className="text-muted-foreground text-sm">
          Enter your information below to create your account.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input {...register('email')} placeholder="m@example.com" />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </Field>

        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input {...register('password')} type="password" />
          {errors.password ? (
            <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
          ) : (
            <FieldDescription className="text-xs text-muted-foreground">
              Must be at least 8 characters long.
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input {...register('confirmPassword')} type="password" />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
          )}
        </Field>
      </div>

      <Button disabled={isSubmitting} className="w-full h-11 text-base">
        {isSubmitting ? 'Creating...' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="underline font-medium text-primary">
          Sign in
        </Link>
      </p>
    </form>
  );
}
