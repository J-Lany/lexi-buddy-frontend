'use client';

import { Users } from 'lucide-react';
import { useMemo } from 'react';

import { useMyGroupsQuery } from '@/entities/groups/model/query/get-my-groups';
import { filterGroupsByQuery } from '@/features/groups/lib/filter-groups';
import { GroupsTable } from '@/features/groups/widgets/groups-list/ui/ groups-table/group-table';
import { GroupsTableSkeleton } from '@/features/groups/widgets/groups-list/ui/groups-table-skeleton';
import { EmptyStateCard } from '@/shared/ui/empty-state-card';

type Props = {
  query: string;
};

export function GroupsListWidget({ query }: Props) {
  const { data, isLoading, isError } = useMyGroupsQuery();

  const filtered = useMemo(() => {
    return filterGroupsByQuery(data ?? [], query);
  }, [data, query]);

  const showSkeleton = isLoading;
  const showError = isError;

  const groupsCount = data?.length ?? 0;

  const showEmpty = !isLoading && !isError && groupsCount === 0;
  const showNoResults = !isLoading && !isError && groupsCount > 0 && filtered.length === 0;
  const showTable = !isLoading && !isError && filtered.length > 0;

  return (
    <section className="flex flex-col gap-4">
      {showSkeleton && <GroupsTableSkeleton />}

      {showTable && <GroupsTable groups={filtered} />}

      {showError && (
        <EmptyStateCard
          surface="canvas"
          title="Something went wrong"
          description="Try refreshing the page."
        />
      )}

      {showEmpty && (
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
      )}

      {showNoResults && (
        <EmptyStateCard
          surface="canvas"
          title="No results"
          description="Check the spelling or try another keyword."
        />
      )}
    </section>
  );
}
