export function FeaturesSection() {
  return (
    <section className="section features-section" id="features">
      <div className="reveal">
        <span className="eyebrow">Platform features</span>

        <h2 className="section-h">
          Everything a language teacher
          <br />
          actually needs
        </h2>

        <p className="section-sub">
          Built around your real workflow — not a generic one-size-fits-all tool.
        </p>
      </div>

      <div className="features-grid">
        <div className="feat wide reveal">
          <div className="feat-ico">🤖</div>
          <div className="feat-body">
            <h3>AI lesson builder</h3>
            <p>
              Paste a word list, pick your settings — and watch Lexi generate a complete,
              contextually appropriate lesson in seconds. Every translation, synonym, and exercise
              is tailored to your level and age group. Edit anything with a click.
            </p>
          </div>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">📱</div>
          <h3>Telegram-native learning</h3>
          <p>
            Students do all their exercises inside Telegram — no new app, no login. They get
            notified when a new lesson is ready and start immediately.
          </p>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">👥</div>
          <h3>Student &amp; group management</h3>
          <p>
            Invite students by Telegram username. Create groups for your classes. Assign the same
            lesson to everyone in one click.
          </p>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">📊</div>
          <h3>Progress tracking</h3>
          <p>
            See each student&apos;s completion status, average score, and last activity at a glance.
            Drill into per-task-type results when you need detail.
          </p>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">🔁</div>
          <h3>Reusable lesson library</h3>
          <p>
            Every lesson is saved permanently. Reassign it to new students or groups anytime —
            perfect for teachers who run the same course repeatedly.
          </p>
        </div>

        <div className="feat reveal">
          <div className="feat-ico">🌍</div>
          <h3>More languages coming soon</h3>
          <p>
            Currently for English teachers with Russian-speaking students. Expanding to many more
            language pairs — stay tuned.
          </p>
        </div>
      </div>
    </section>
  );
}
