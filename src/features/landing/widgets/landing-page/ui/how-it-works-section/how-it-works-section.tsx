export function HowItWorksSection() {
  return (
    <section className="section how-section" id="how">
      <div className="reveal">
        <span className="eyebrow">How it works</span>

        <h2 className="section-h">
          From word list to full lesson
          <br />
          in 4 simple steps
        </h2>

        <p className="section-sub">
          No more hours spent creating home tasks and drills. Lexi Buddy does the heavy lifting so
          you can focus on teaching.
        </p>
      </div>

      <div className="steps-wrap">
        <div className="steps-grid reveal">
          <div className="step">
            <div className="step-n">01</div>
            <div className="step-ico">📝</div>
            <h3>Add lesson details</h3>
            <p>
              Set the name, level (A1–C2), age group, and topic. This context shapes every exercise
              the AI creates.
            </p>
          </div>

          <div className="step">
            <div className="step-n">02</div>
            <div className="step-ico">📋</div>
            <h3>Paste your word list</h3>
            <p>
              Add up to 15 words or phrases. Hit the button — AI adds Russian translations and
              English synonyms instantly, creating a handy Glossary.
            </p>
          </div>

          <div className="step">
            <div className="step-n">03</div>
            <div className="step-ico">⚡</div>
            <h3>Generate and review exercises</h3>
            <p>
              Choose 1 to 4 task types. AI creates questions, distractors and explanations. Review
              and edit anything you like.
            </p>
          </div>

          <div className="step">
            <div className="step-n">04</div>
            <div className="step-ico">🚀</div>
            <h3>Assign and track progress</h3>
            <p>
              Send the lesson to individual students or groups. They get a Telegram notification and
              complete it right in the bot — no app needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
