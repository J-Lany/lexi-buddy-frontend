export function TasksSection() {
  return (
    <section className="section tasks-section" id="tasks">
      <div className="reveal">
        <span className="eyebrow">Exercise types</span>

        <h2 className="section-h">
          4 proven formats,
          <br />
          all AI-generated
        </h2>

        <p className="section-sub">
          Each task type targets a different aspect of vocabulary acquisition — from recall to
          real-world usage.
        </p>
      </div>

      <div className="tasks-grid">
        <div className="task reveal">
          <div className="task-n">01</div>
          <div>
            <h3>Definition quiz</h3>
            <p>
              Students choose the correct meaning from 3 options. Tests recognition and
              comprehension. Each question includes an explanation.
            </p>
          </div>
        </div>

        <div className="task reveal">
          <div className="task-n">02</div>
          <div>
            <h3>Gap filling</h3>
            <p>
              Students complete a sentence by filling in the missing word. Tests active recall and
              contextual understanding.
            </p>
          </div>
        </div>

        <div className="task reveal">
          <div className="task-n">03</div>
          <div>
            <h3>Phrase fail</h3>
            <p>
              Students identify which sentence uses a word incorrectly. Builds awareness of meaning
              boundaries and common misuse patterns.
            </p>
          </div>
        </div>

        <div className="task reveal">
          <div className="task-n">04</div>
          <div>
            <h3>Collocation check</h3>
            <p>
              Students pick the word that fits correctly across multiple sentences — the most
              advanced format, training natural collocational fluency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
