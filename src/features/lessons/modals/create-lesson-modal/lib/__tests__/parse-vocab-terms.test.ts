import { parseVocabTerms, VOCAB_MAX_TERMS } from '../parse-vocab-terms';

describe('parseVocabTerms', () => {
  it('splits on dots and trims whitespace', () => {
    const { terms, normalized } = parseVocabTerms(' apple . bread .cheese');
    expect(terms).toEqual(['apple', 'bread', 'cheese']);
    expect(normalized).toBe('apple. bread. cheese');
  });

  it('drops empty segments from blank input, trailing dots and repeated dots', () => {
    expect(parseVocabTerms('').terms).toEqual([]);
    expect(parseVocabTerms('   ').terms).toEqual([]);
    expect(parseVocabTerms('apple.').terms).toEqual(['apple']);
    expect(parseVocabTerms('apple..bread').terms).toEqual(['apple', 'bread']);
  });

  it(`does not truncate at ${VOCAB_MAX_TERMS} terms`, () => {
    const words = Array.from({ length: VOCAB_MAX_TERMS }, (_, i) => `word${i}`);
    const { terms, normalized } = parseVocabTerms(words.join('. '));
    expect(terms).toHaveLength(VOCAB_MAX_TERMS);
    expect(normalized).toBe(words.join('. '));
  });

  it(`keeps every term beyond ${VOCAB_MAX_TERMS} instead of silently dropping them`, () => {
    const words = Array.from({ length: VOCAB_MAX_TERMS + 5 }, (_, i) => `word${i}`);
    const { terms, normalized } = parseVocabTerms(words.join('. '));
    expect(terms).toHaveLength(VOCAB_MAX_TERMS + 5);
    expect(normalized).toBe(words.join('. '));
  });
});
