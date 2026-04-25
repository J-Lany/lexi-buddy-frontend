export function TestimonialsSection() {
  return (
    <section className="section testi-section" id="testimonials">
      <div className="reveal">
        <span className="eyebrow">What teachers say</span>

        <h2 className="section-h">
          Built with real teachers,
          <br />
          for real classrooms
        </h2>
      </div>

      <div className="testi-grid">
        <div className="testi reveal">
          <div className="testi-stars">★★★★★</div>
          <p className="testi-text">
            &quot;I used to spend 40 minutes crafting exercises for a single vocabulary set. With
            Lexi Buddy I do it in 90 seconds. The quality genuinely surprised me.&quot;
          </p>
          <div className="testi-author">
            <div className="testi-ava">👩‍🏫</div>
            <div>
              <div className="testi-name">Anastasia K.</div>
              <div className="testi-role">English teacher · Moscow</div>
            </div>
          </div>
        </div>

        <div className="testi reveal">
          <div className="testi-stars">★★★★★</div>
          <p className="testi-text">
            &quot;My students love that everything happens in Telegram. No new logins, no confusion.
            They get a message and start the lesson. Simple.&quot;
          </p>
          <div className="testi-author">
            <div className="testi-ava">👨‍🏫</div>
            <div>
              <div className="testi-name">Dmitri V.</div>
              <div className="testi-role">Private tutor · St. Petersburg</div>
            </div>
          </div>
        </div>

        <div className="testi reveal">
          <div className="testi-stars">★★★★★</div>
          <p className="testi-text">
            &quot;The progress tracking is exactly what I needed. I can see who&apos;s struggling
            with which task type and adjust my next lesson accordingly.&quot;
          </p>
          <div className="testi-author">
            <div className="testi-ava">👩‍💼</div>
            <div>
              <div className="testi-name">Elena M.</div>
              <div className="testi-role">Online English teacher · 60+ students</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
