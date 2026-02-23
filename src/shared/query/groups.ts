export const groupsKeys = {
  all: ['groups'] as const,
  myList: () => [...groupsKeys.all, 'list'] as const,
  dashboard: (groupId: number) => [...groupsKeys.all, 'dashboard', groupId] as const,
} as const;
