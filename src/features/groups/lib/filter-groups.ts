import type { GroupDto } from '@/entities/groups/api/get-my-groups';

export function filterGroupsByQuery(groups: readonly GroupDto[], query: string): GroupDto[] {
  const q = query.trim().toLowerCase();
  if (!q) return [...groups];

  return groups.filter((g) => {
    const haystack = `${g.name ?? ''} ${g.level ?? ''}`.toLowerCase();
    return haystack.includes(q);
  });
}
