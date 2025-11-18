import { Suspense } from 'react';
import { BadgeCheck } from 'lucide-react';
import { ActivationInfo } from '@/features/auth/activation-info';

export default function ActivatePage() {
  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-white">
      <section className="hidden md:flex h-full w-full bg-sidebar items-center justify-center">
        <div className="max-w-md space-y-6 text-center px-8">
          <BadgeCheck className="mx-auto h-32 w-32 text-primary" />
          <h1 className="text-4xl font-semibold tracking-tight">Activate your account</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Finish setting up your profile to gain access to all the platform features.
          </p>
        </div>
      </section>
      <div className="flex items-center justify-center p-8">
        <Suspense fallback={null}>
          <ActivationInfo />
        </Suspense>
      </div>
    </main>
  );
}
