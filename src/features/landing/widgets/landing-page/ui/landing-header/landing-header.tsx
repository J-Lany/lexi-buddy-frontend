import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/shared/router/routes';

export function LandingHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav id="nav">
      <Link href={routes.main} className="nav-logo">
        <Image src="/icon.webp" alt="Lexi Buddy" width={38} height={38} priority unoptimized />

        <span className="nav-logo-wordmark">
          Lexi <b>Buddy</b>
        </span>
      </Link>

      <div className="nav-center">
        <Link href="#telegram">Telegram</Link>
        <Link href="#how">How it works</Link>
        <Link href="#features">Features</Link>
        <Link href="#tasks">Exercise types</Link>
        <Link href="#testimonials">Reviews</Link>
        <span className="nav-sep" aria-hidden />
        <Link href={routes.help} className="nav-help">
          Help &amp; Q&amp;A
        </Link>
      </div>

      <div className="nav-right">
        <Link href={routes.help} className="nav-help-mobile">
          Help
        </Link>

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
  );
}
