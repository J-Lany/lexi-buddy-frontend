import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/shared/router/routes';

export function FooterSection() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="#" className="footer-logo">
            <Image src="/icon.webp" alt="Lexi Buddy" width={34} height={34} unoptimized />

            <span className="footer-logo-wm">
              Lexi <b>Buddy</b>
            </span>
          </Link>

          <p className="footer-tagline">
            AI-powered lesson builder for English teachers and Telegram-native practice for
            students.
          </p>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <Link href="#telegram">Telegram bot</Link>
          <Link href="#how">How it works</Link>
          <Link href="#features">Features</Link>
          <Link href="#tasks">Exercise types</Link>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <Link href={routes.login}>Log in</Link>
          <Link href={routes.register}>Get started</Link>
        </div>

        <div className="footer-col">
          <h4>Students</h4>
          <a href="https://t.me/lexi_buddy_bot" target="_blank">
            @lexi_buddy_bot
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Lexi Buddy</span>
        <span>Built for English teachers</span>
      </div>
    </footer>
  );
}
