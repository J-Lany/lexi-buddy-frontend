export enum EStudentsTab {
  STUDENTS,
  GROUPS,
}

export const STUDENTS_TABS = [
  { value: EStudentsTab.STUDENTS, label: 'All students' },
  { value: EStudentsTab.GROUPS, label: 'Groups' },
] as const;
