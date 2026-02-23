export function formatName(p: {
  firstName: string | null;
  lastName: string | null;
  username: string | null;
}) {
  const full = [p.firstName, p.lastName].filter(Boolean).join(' ').trim();
  return full || (p.username ? `@${p.username}` : 'Student');
}

export function formatDate(value: string | null) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString();
}
