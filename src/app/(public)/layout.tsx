import '@/features/landing/widgets/landing-page/landing-page.css';

import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { routes } from '@/shared/router/routes';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('refresh_token');

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: '#f4fcfd' }}>
      <div
        className="landing-page"
        style={{ minHeight: 0, overflow: 'visible', background: 'transparent' }}
      >
        <nav>
          <Link href={routes.main} className="nav-logo">
            <Image src="/icon.webp" alt="Lexi Buddy" width={38} height={38} priority unoptimized />
            <span className="nav-logo-wordmark">
              Lexi <b>Buddy</b>
            </span>
          </Link>

          <div className="nav-right">
            {isLoggedIn ? (
              <Link href={routes.students} className="nav-cta">
                Open app
              </Link>
            ) : (
              <>
                <Link href={routes.login} className="nav-login">
                  Log in
                </Link>
                <Link href={routes.register} className="nav-cta">
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      <div style={{ height: 68, flexShrink: 0 }} aria-hidden />

      <div className="flex-1 px-6 sm:px-10 py-6 sm:py-10 max-w-5xl mx-auto w-full">{children}</div>
    </div>
  );
}
