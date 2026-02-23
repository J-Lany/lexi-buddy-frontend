const MAX_TERMS = 15;

export function parseVocabTerms(raw: string): { terms: string[]; normalized: string } {
  const parts = raw
    .split('.')
    .map((t) => t.trim())
    .filter(Boolean);

  const limited = parts.slice(0, MAX_TERMS);
  return { terms: limited, normalized: limited.join('. ') };
}

export const VOCAB_MAX_TERMS = MAX_TERMS;
