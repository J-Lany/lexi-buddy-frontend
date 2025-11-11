'use client';

import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { EAuthFormType } from '@/lib/constants/auth';
import {
  LoginFormValues,
  loginSchema,
  RegisterFormValues,
  registerSchema,
} from '@/lib/validation/auth';
import { registerUser } from '@/lib/api/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { EAppRoutes } from '@/lib/constants/routes';

interface AuthFormProps {
  type: EAuthFormType;
}

export function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === EAuthFormType.LOGIN;
  const formSchema = isLogin ? loginSchema : registerSchema;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: LoginFormValues | RegisterFormValues) => {
    try {
      if (isLogin) {
        console.log('Login form submitted', data);
        // TODO: вызвать loginUser(email, password) когда будет готов API
      } else {
        const { email, password } = data as RegisterFormValues;
        await registerUser(email, password);

        toast.success('Account created 🎉', {
          description: 'Check your email to activate your account.',
        });

        router.push(EAppRoutes.LOGIN);
      }
    } catch (err) {
      toast.error('Something went wrong', {
        description: err.message || 'Please try again.',
      });
    }
  };

  return (
    <div className="grid gap-6">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 md:h-10"
      >
        <FcGoogle className="h-5 w-5" />
        Google
      </Button>
      <div className="relative">
        <Separator className="my-4" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-background px-2 text-sm text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register('email')}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required {...register('password')} />
          {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
        </div>
        {!isLogin && (
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
        )}
        <Button type="submit" className="w-full h-12 md:h-10" disabled={isSubmitting}>
          {isLogin ? 'Login' : 'Create Account'}
        </Button>
      </form>
      <div className="flex justify-center items-baseline text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Don’t have an account?
            <Button asChild variant="link" className="text-primary hover:text-primary/80">
              <Link href={EAppRoutes.REGISTRATION}>Sign up</Link>
            </Button>
          </>
        ) : (
          <>
            Already have an account?
            <Button asChild variant="link" className="text-primary hover:text-primary/80">
              <Link href={EAppRoutes.LOGIN}>Log in</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
