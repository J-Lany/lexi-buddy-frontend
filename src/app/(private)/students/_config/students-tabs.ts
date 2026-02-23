export const studentsTabs = {
  students: 'students',
  groups: 'groups',
} as const;

export type StudentsTab = (typeof studentsTabs)[keyof typeof studentsTabs];

export const STUDENTS_TABS_OPTIONS = [
  { value: studentsTabs.students, label: 'Students' },
  { value: studentsTabs.groups, label: 'Groups' },
] as const;

export function normalizeStudentsTab(v: string | null): StudentsTab {
  return v === studentsTabs.groups ? studentsTabs.groups : studentsTabs.students;
}
