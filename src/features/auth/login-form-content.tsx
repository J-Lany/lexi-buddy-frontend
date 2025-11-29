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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const signup = useSigninMutation();

  const onSubmit = (data: LoginFormValues) => {
    const { email, password } = data;
    const payload = { email, password };
    signup.mutate(payload, {
      onSuccess: () => {
        router.push(EAppRoutes.HOME);
      },
      onError: (error) => {
        toast.error('Something went wrong', { description: error.message });
      },
    });
  };

  return (
    <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Login to your account</h2>
        <p className="text-muted-foreground text-sm">
          Enter your email below to login to your account
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
      </div>

      <Button disabled={isSubmitting} className="w-full h-11 text-base">
        {isSubmitting ? 'In process...' : 'Login'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don’t have an account?{' '}
        <Link href={EAppRoutes.REGISTRATION} className="underline font-medium text-primary">
          Sign up
        </Link>
      </p>
    </form>
  );
}
