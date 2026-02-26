function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function extractText(v: unknown): string | null {
  if (typeof v === 'string') return v.trim() || null;

  if (isRecord(v)) {
    const value = v.value;

    if (isRecord(value) && typeof value.text === 'string') {
      const t = value.text.trim();
      return t || null;
    }

    if (typeof v.text === 'string') {
      const t = v.text.trim();
      return t || null;
    }
  }

  return null;
}

export function formatStudentAnswer(answer: unknown): string {
  if (answer === null || answer === undefined) return '—';

  if (Array.isArray(answer)) {
    const texts = answer.map(extractText).filter((x): x is string => Boolean(x));

    return texts.length ? texts.join(' · ') : '—';
  }

  const text = extractText(answer);
  return text ?? '—';
}
