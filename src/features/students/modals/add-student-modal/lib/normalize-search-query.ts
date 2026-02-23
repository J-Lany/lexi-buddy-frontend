export function normalizeQuery(input: string) {
  return input.trim().replace(/^@+/, '');
}
