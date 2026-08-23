const MAX_TERMS = 10;

export function parseVocabTerms(raw: string): { terms: string[]; normalized: string } {
  const parts = raw
    .split('.')
    .map((t) => t.trim())
    .filter(Boolean);

  return { terms: parts, normalized: parts.join('. ') };
}

export const VOCAB_MAX_TERMS = MAX_TERMS;
