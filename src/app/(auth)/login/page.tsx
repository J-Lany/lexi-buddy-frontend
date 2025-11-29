import { ShieldUser } from 'lucide-react';
import { SigninForm } from '@/features/auth/signin-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-white">
      <section className="hidden md:flex h-full w-full bg-sidebar items-center justify-center">
        <div className="max-w-md space-y-6 text-center px-8">
          <ShieldUser className="mx-auto h-32 w-32 text-primary" />
          <h1 className="text-4xl font-semibold tracking-tight">Welcome back, teacher!</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Access your teaching dashboard, manage lessons, and track student progress — all in one
            place.
          </p>
        </div>
      </section>
      <div className="flex items-center justify-center p-8">
        <SigninForm />
      </div>
    </main>
  );
}
