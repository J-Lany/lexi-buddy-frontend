import Link from 'next/link';

import { routes } from '@/shared/router/routes';

export function TelegramComboSection() {
  return (
    <div className="tg-section" id="telegram">
      <div className="tg-grid">
        <div className="reveal">
          <span className="tg-eyebrow">Platform + Telegram bot</span>

          <h2 className="tg-title">
            One platform.
            <br />
            One bot.
            <br />
            <span>Zero friction.</span>
          </h2>

          <p className="tg-body">
            Lexi Buddy is a duo — a web platform for teachers to build and manage lessons, paired
            with a Telegram bot where students complete their drills. No extra apps, no logins for
            students, no setup headaches.
          </p>

          <a href="https://t.me/lexi_buddy_bot" className="tg-handle" target="_blank">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden>
              <path d="M11.944 0A12 12 0 1 0 24 12 12 12 0 0 0 11.944 0zm5.78 8.25-2.01 9.49c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.873.722z" />
            </svg>
            @lexi_buddy_bot
          </a>

          <br />

          <Link href={routes.register} className="tg-cta-btn">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            Open the teacher platform
          </Link>
        </div>

        <div className="tg-cards reveal">
          <div className="tg-card">
            <div className="tg-card-ico">👩‍🏫</div>
            <div>
              <h4>For teachers — the web platform</h4>
              <p>
                Create lessons with AI, manage students and groups, assign drills in one click, and
                track every student&apos;s progress in real time — all from your browser at
                lexi-buddy.com.
              </p>
            </div>
          </div>

          <div className="tg-card">
            <div className="tg-card-ico">📱</div>
            <div>
              <h4>For students — the Telegram bot</h4>
              <p>
                Students start <b>@lexi_buddy_bot</b> once. After that, every new lesson arrives as
                a Telegram notification. They tap and start drilling immediately — no website, no
                password.
              </p>
            </div>
          </div>

          <div className="tg-card">
            <div className="tg-card-ico">⚡</div>
            <div>
              <h4>Why this combo works so well</h4>
              <p>
                Telegram has near-100% open rates. Students already live there. Lessons that arrive
                in Telegram get done — not ignored like emails or forgotten apps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
