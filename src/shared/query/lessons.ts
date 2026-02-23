export const lessonsKeys = {
  all: ['lessons'] as const,
  myList: () => [...lessonsKeys.all, 'list'] as const,
  dashboard: (lessonId: number) => [...lessonsKeys.all, 'dashboard', lessonId] as const,
} as const;
