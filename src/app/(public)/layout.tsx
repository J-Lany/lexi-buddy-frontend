import '@/features/landing/widgets/landing-page/landing-page.css';

import { cookies } from 'next/headers';
import React from 'react';

import { LandingHeader } from '@/features/landing/widgets/landing-page/ui/landing-header/landing-header';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('refresh_token');

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#f4fcfd' }}>
      <div
        className="landing-page"
        style={{ minHeight: 0, overflow: 'visible', background: 'transparent' }}
      >
        <LandingHeader isLoggedIn={isLoggedIn} />
      </div>

      <div style={{ height: 68, flexShrink: 0 }} aria-hidden />

      <div className="flex-1 px-6 sm:px-10 py-6 sm:py-10 max-w-5xl mx-auto w-full">{children}</div>
    </div>
  );
}
