import type { StudentBySearchDto } from '@/entities/students/api/search-students';

import { getStudentDisplayName, getStudentHandle } from '../student-display';

const student = (patch: Partial<StudentBySearchDto>): StudentBySearchDto => ({
  id: 1,
  username: null,
  firstName: null,
  lastName: null,
  level: null as unknown as StudentBySearchDto['level'],
  telegramId: null,
  ...patch,
});

describe('getStudentDisplayName', () => {
  it('берёт имя, затем ник, затем Telegram ID, затем «?»', () => {
    expect(
      getStudentDisplayName(student({ firstName: 'Анна', username: 'anna', telegramId: '1' })),
    ).toBe('Анна');
    expect(getStudentDisplayName(student({ username: 'anna', telegramId: '1' }))).toBe('anna');
    expect(getStudentDisplayName(student({ telegramId: '123456789' }))).toBe('123456789');
    expect(getStudentDisplayName(student({}))).toBe('?');
  });
});

describe('getStudentHandle', () => {
  it('показывает @ник, а без ника — Telegram ID', () => {
    expect(getStudentHandle(student({ username: 'anna', telegramId: '1' }))).toBe('@anna');
    expect(getStudentHandle(student({ telegramId: '123456789' }))).toBe('ID 123456789');
    expect(getStudentHandle(student({}))).toBeNull();
  });
});
