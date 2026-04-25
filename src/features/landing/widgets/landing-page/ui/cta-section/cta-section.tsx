import Link from 'next/link';

import { routes } from '@/shared/router/routes';

export function CtaSection() {
  return (
    <section className="cta-section">
      <div className="cta-free-pill reveal">✦ 100% FREE · No credit card needed</div>

      <h2 className="cta-h reveal">Ready to reclaim your prep time?</h2>

      <p className="cta-p reveal">
        Join English teachers already using Lexi Buddy to create better learning experiences, faster
        and with no extra charges!
      </p>

      <div className="reveal">
        <Link href={routes.register} className="btn-white">
          Start using — it&apos;s FREE!
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <p className="cta-note reveal">
        Students use <a href="https://t.me/lexi_buddy_bot">@lexi_buddy_bot</a> on Telegram — no
        extra setup needed
      </p>
    </section>
  );
}
