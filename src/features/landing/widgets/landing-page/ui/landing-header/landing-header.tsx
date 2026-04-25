import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/shared/router/routes';

export function LandingHeader() {
  return (
    <nav id="nav">
      <Link href="#" className="nav-logo">
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
      </div>

      <div className="nav-right">
        <Link href={routes.login} className="nav-login">
          Log in
        </Link>

        <Link href={routes.register} className="nav-cta">
          Get started
        </Link>
      </div>
    </nav>
  );
}
