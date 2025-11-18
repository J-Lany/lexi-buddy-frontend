import { UsersRound } from 'lucide-react';
import { SignupForm } from '@/features/auth/signup-form';

export default function RegisterPage() {
  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-white">
      <section className="hidden md:flex h-full w-full bg-sidebar items-center justify-center">
        <div className="max-w-md space-y-6 text-center px-8">
          <UsersRound className="mx-auto h-32 w-32 text-primary" />
          <h1 className="text-4xl font-semibold tracking-tight">Join the LexiBuddy platform</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Create and manage interactive lessons, assignments, and monitor your students’ learning
            in real time.
          </p>
        </div>
      </section>
      <div className="flex items-center justify-center p-8">
        <SignupForm />
      </div>
    </main>
  );
}
