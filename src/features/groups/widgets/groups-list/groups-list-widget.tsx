'use client';

import { Users } from 'lucide-react';
import { useMemo } from 'react';

import { useMyGroupsQuery } from '@/entities/groups/model/query/get-my-groups';
import { filterGroupsByQuery } from '@/features/groups/lib/filter-groups';
import { CreateGroupModal } from '@/features/groups/modals/create-group/create-group-modal';
import { GroupsTable } from '@/features/groups/widgets/groups-list/ui/groups-table/group-table';
import { GroupsTableSkeleton } from '@/features/groups/widgets/groups-list/ui/groups-table-skeleton';
import { useI18n } from '@/shared/i18n';
import { getListViewState } from '@/shared/lib/list-view-state';
import { EmptyStateCard } from '@/shared/ui/empty-state-card';
import { emptyStatePrimaryActionClassName, EmptyStateV2 } from '@/shared/ui/empty-state-v2';

type Props = {
  query: string;
};

export function GroupsListWidget({ query }: Props) {
  const { t } = useI18n();
  const { data, isPending, isError } = useMyGroupsQuery();

  const filtered = useMemo(() => {
    return filterGroupsByQuery(data ?? [], query);
  }, [data, query]);

  const groupsCount = data?.length ?? 0;

  const view = getListViewState({
    isPending,
    isError,
    totalCount: groupsCount,
    filteredCount: filtered.length,
  });

  return (
    <section className="flex flex-col gap-4">
      {view === 'loading' && <GroupsTableSkeleton />}

      {view === 'list' && <GroupsTable groups={filtered} />}

      {view === 'error' && (
        <EmptyStateCard
          surface="canvas"
          title={t('groups.list.error')}
          description={t('groups.list.errorDesc')}
        />
      )}

      {view === 'empty' && (
        <EmptyStateV2
          icon={<Users strokeWidth={1.4} />}
          title={t('groups.list.empty')}
          description={t('groups.list.emptyDesc')}
          steps={[
            {
              id: 'name',
              title: t('groups.list.emptyStep1Title'),
              desc: t('groups.list.emptyStep1Desc'),
            },
            {
              id: 'students',
              title: t('groups.list.emptyStep2Title'),
              desc: t('groups.list.emptyStep2Desc'),
            },
            {
              id: 'assign',
              title: t('groups.list.emptyStep3Title'),
              desc: t('groups.list.emptyStep3Desc'),
            },
          ]}
          primaryAction={
            <CreateGroupModal
              triggerProps={{
                variant: 'default',
                size: 'lg',
                className: emptyStatePrimaryActionClassName,
              }}
            />
          }
          pinTopLeft="9-Б"
          pinBottomRight="3 ученика"
        />
      )}

      {view === 'no-results' && (
        <EmptyStateCard
          surface="canvas"
          title={t('groups.list.noResults')}
          description={t('groups.list.noResultsDesc')}
        />
      )}
    </section>
  );
}
