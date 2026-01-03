'use client';

import { useMemo } from 'react';
import { useGetGroups } from '@/features/groups/hooks/use-get-groups';
import { GroupTable } from '@/features/groups/group-table/components/group-table';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import { CreateGroupModal } from '@/features/groups/create-group-modal/create-group-modal';
import { Group } from '@/features/groups/group-table/components/group-row';

export function GroupsFragment({ query }: { query: string }) {
  const { data } = useGetGroups();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!data || !q) return data ?? [];

    return data.filter((g: Group) => {
      const haystack = `${g.name ?? ''} ${g.level ?? ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [data, query]);

  if (data && data.length === 0) {
    return (
      <section className="flex flex-col gap-4">
        <EmptyStateCard
          title="No groups yet"
          description="Create a group to organize students and lessons."
          action={<CreateGroupModal />}
        />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {!!filtered.length && <GroupTable groups={filtered} />}

      {data && data.length > 0 && filtered.length === 0 && (
        <EmptyStateCard
          title="No results"
          description="Check the spelling or try another keyword."
        />
      )}
    </section>
  );
}
