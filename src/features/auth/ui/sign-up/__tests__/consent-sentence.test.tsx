import { render, screen } from '@testing-library/react';

import { I18nProvider } from '@/shared/i18n';
import { routes } from '@/shared/router/routes';

import { ConsentSentence, parseConsentSentence } from '../consent-sentence';

function renderSentence(template: string) {
  return render(
    <I18nProvider>
      <ConsentSentence template={template} />
    </I18nProvider>,
  );
}

describe('parseConsentSentence', () => {
  it('parses the standard order (terms, privacy, pdn)', () => {
    const parts = parseConsentSentence('A {{terms}} B {{privacy}} C {{pdn}} D');
    expect(parts).toEqual([
      { type: 'text', value: 'A ' },
      { type: 'link', token: 'terms' },
      { type: 'text', value: ' B ' },
      { type: 'link', token: 'privacy' },
      { type: 'text', value: ' C ' },
      { type: 'link', token: 'pdn' },
      { type: 'text', value: ' D' },
    ]);
  });

  it('parses a different order (pdn, terms, privacy) without special-casing it', () => {
    const parts = parseConsentSentence('X {{pdn}} Y {{terms}} Z {{privacy}} W');
    expect(
      parts.filter((p) => p.type === 'link').map((p) => (p as { token: string }).token),
    ).toEqual(['pdn', 'terms', 'privacy']);
  });

  it('tolerates a missing token — the sentence still parses, just without that link', () => {
    const parts = parseConsentSentence('A {{terms}} B {{privacy}} C');
    const tokens = parts
      .filter((p) => p.type === 'link')
      .map((p) => (p as { token: string }).token);
    expect(tokens).toEqual(['terms', 'privacy']);
    expect(tokens).not.toContain('pdn');
  });

  it('tolerates a duplicated token — both occurrences are parsed as links', () => {
    const parts = parseConsentSentence('{{terms}} and {{terms}} again, then {{privacy}} {{pdn}}');
    const tokens = parts
      .filter((p) => p.type === 'link')
      .map((p) => (p as { token: string }).token);
    expect(tokens).toEqual(['terms', 'terms', 'privacy', 'pdn']);
  });

  it('preserves every character of user text across text and link parts', () => {
    const template = 'Intro {{terms}} middle {{privacy}} end {{pdn}} outro.';
    const parts = parseConsentSentence(template);
    // Reconstruct using the token literal in place of each link part — must equal the original.
    const reconstructed = parts
      .map((p) => (p.type === 'text' ? p.value : `{{${p.token}}}`))
      .join('');
    expect(reconstructed).toBe(template);
  });

  it('never throws on malformed input (unknown token, unclosed braces, empty string)', () => {
    expect(() => parseConsentSentence('{{unknown}} plain text')).not.toThrow();
    expect(() => parseConsentSentence('unterminated {{terms')).not.toThrow();
    expect(() => parseConsentSentence('')).not.toThrow();
  });
});

describe('ConsentSentence rendering', () => {
  it('renders links with the correct hrefs, in whatever order tokens appear', () => {
    renderSentence('Start {{pdn}} mid {{terms}} mid {{privacy}} end');

    expect(screen.getByRole('link', { name: 'processing of my personal data' })).toHaveAttribute(
      'href',
      routes.pdnConsent,
    );
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toHaveAttribute(
      'href',
      routes.terms,
    );
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      routes.privacy,
    );
  });

  it('does not crash when a token is missing — the required link is still present via the fallback', () => {
    expect(() => renderSentence('Only {{terms}} and {{privacy}} here.')).not.toThrow();
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'processing of my personal data' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Only/)).toBeInTheDocument();
  });

  it('renders a duplicated token as two separate working links', () => {
    renderSentence('{{terms}} then {{terms}} again');
    expect(screen.getAllByRole('link', { name: 'Terms of Use' })).toHaveLength(2);
  });

  it('renders plain text unchanged when there are no tokens at all', () => {
    renderSentence('No links here.');
    // Regex (substring) match, since the fallback fragment now appends
    // sibling text/links after "No links here." within the same container.
    expect(screen.getByText(/No links here\./)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'processing of my personal data' }),
    ).toBeInTheDocument();
  });
});

describe('ConsentSentence — missing-token fallback', () => {
  it('appends the Terms link via the fallback when {{terms}} is missing', () => {
    renderSentence('Only {{privacy}} and {{pdn}} here.');
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toHaveAttribute(
      'href',
      routes.terms,
    );
    expect(screen.getByText(/Also review:/)).toBeInTheDocument();
  });

  it('appends the Privacy link via the fallback when {{privacy}} is missing', () => {
    renderSentence('Only {{terms}} and {{pdn}} here.');
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      routes.privacy,
    );
  });

  it('appends the PDN link via the fallback when {{pdn}} is missing', () => {
    renderSentence('Only {{terms}} and {{privacy}} here.');
    expect(screen.getByRole('link', { name: 'processing of my personal data' })).toHaveAttribute(
      'href',
      routes.pdnConsent,
    );
  });

  it('appends all three links via the fallback when every token is missing', () => {
    renderSentence('No tokens at all in this sentence.');
    expect(screen.getByRole('link', { name: 'Terms of Use' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'processing of my personal data' }),
    ).toBeInTheDocument();
  });

  it('does not duplicate a link whose token IS present — only the missing one is appended', () => {
    renderSentence('Only {{terms}} and {{privacy}} here.');
    expect(screen.getAllByRole('link', { name: 'Terms of Use' })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: 'Privacy Policy' })).toHaveLength(1);
    expect(screen.getAllByRole('link', { name: 'processing of my personal data' })).toHaveLength(1);
  });

  it.each([
    'Only {{terms}} here.',
    'Only {{privacy}} here.',
    'Only {{pdn}} here.',
    'No tokens whatsoever.',
    '{{terms}} {{terms}} duplicated, nothing else.',
    '{{pdn}} {{terms}} reordered, missing privacy.',
  ])('every malformed template still exposes all three legal hrefs: %s', (template) => {
    renderSentence(template);
    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toContain(routes.terms);
    expect(hrefs).toContain(routes.privacy);
    expect(hrefs).toContain(routes.pdnConsent);
  });

  it('does not append a fallback fragment when no tokens are missing', () => {
    renderSentence('A {{terms}} B {{privacy}} C {{pdn}} D');
    expect(screen.queryByText('Also review:')).toBeNull();
  });
});
