import type React from 'react';

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="ui-card-static ui-radius-card p-5 sm:p-6 space-y-3">
      <h2 className="ui-title">{title}</h2>
      <div className="ui-meta whitespace-normal! overflow-visible! space-y-3">{children}</div>
    </section>
  );
}
