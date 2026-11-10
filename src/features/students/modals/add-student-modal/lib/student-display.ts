import type { StudentBySearchDto } from '@/entities/students/api/search-students';

/** Имя для показа: имя → ник → Telegram ID → «?». */
export function getStudentDisplayName(s: StudentBySearchDto) {
  return s.firstName || s.username || s.telegramId || '?';
}

/** Вторая строка: @ник, а если ника нет — Telegram ID. */
export function getStudentHandle(s: StudentBySearchDto) {
  if (s.username) return `@${s.username}`;
  if (s.telegramId) return `ID ${s.telegramId}`;
  return null;
}
