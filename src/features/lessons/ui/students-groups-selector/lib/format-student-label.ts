import type { AssignStudentOption } from '../model/types';

export function getStudentPrimaryLabel(student: AssignStudentOption): string {
  const name = student.name?.trim();

  if (name) return name;

  const username = student.username?.trim();
  if (username) return `@${username}`;

  return `Student #${student.id}`;
}

export function getStudentSecondaryLabel(student: AssignStudentOption): string | null {
  const name = student.name?.trim();
  const username = student.username?.trim();

  if (!name) return null;

  return username ? `@${username}` : null;
}
