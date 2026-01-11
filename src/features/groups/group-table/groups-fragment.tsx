'use client';

import { useMemo } from 'react';
import { useGetGroups } from '@/features/groups/hooks/use-get-groups';
import { GroupTable } from '@/features/groups/group-table/components/group-table';
import { EmptyStateCard } from '@/components/ui/empty-state-card';
import { CreateGroupModal } from '@/features/groups/create-group-modal/create-group-modal';
import { Group } from '@/features/groups/group-table/components/group-row';
import { Users } from 'lucide-react';

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
      <EmptyStateCard
        icon={
          <Users
            className="h-5 w-5 sm:h-6 sm:w-6 text-[color:color-mix(in_oklch,var(--primary)_55%,black_45%)]"
            aria-hidden
          />
        }
        title="No groups yet"
        description="Create a group to organize students and lessons."
        hint="Tap “Create a group” above"
      />
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
