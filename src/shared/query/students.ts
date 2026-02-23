export const studentsKeys = {
  all: ['students'] as const,
  myList: () => [...studentsKeys.all, 'my-list'] as const,
  dashboard: (studentId: number) => [...studentsKeys.all, 'dashboard', studentId] as const,
  search: (term: string) => [...studentsKeys.all, 'search', term] as const,
} as const;
