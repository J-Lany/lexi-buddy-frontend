import { Suspense } from 'react';
import { ActivationInfo } from '@/features/auth/activation-info';

export default function ActivatePage() {
  return (
    <main className="ui-auth-shell">
      <div className="ui-auth-scroll">
        <div className="ui-auth-center">
          <section className="w-full p-6 sm:p-8 md:p-10">
            <Suspense fallback={null}>
              <ActivationInfo />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  );
}
