export const teacherKeys = {
  all: ['teacher'] as const,
  profile: () => [...teacherKeys.all, 'profile'] as const,
} as const;
