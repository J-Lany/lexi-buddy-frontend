'use client';

import { Users } from 'lucide-react';
import { useMemo } from 'react';

import { useMyGroupsQuery } from '@/entities/groups/model/query/get-my-groups';
import { filterGroupsByQuery } from '@/features/groups/lib/filter-groups';
import { CreateGroupModal } from '@/features/groups/modals/create-group/create-group-modal';
import { GroupsTable } from '@/features/groups/widgets/groups-list/ui/ groups-table/group-table';
import { GroupsTableSkeleton } from '@/features/groups/widgets/groups-list/ui/groups-table-skeleton';
import { useI18n } from '@/shared/i18n';
import { EmptyStateCard } from '@/shared/ui/empty-state-card';
import { EmptyStateV2 } from '@/shared/ui/empty-state-v2';

type Props = {
  query: string;
};

export function GroupsListWidget({ query }: Props) {
  const { t } = useI18n();
  const { data, isLoading, isError } = useMyGroupsQuery();

  const filtered = useMemo(() => {
    return filterGroupsByQuery(data ?? [], query);
  }, [data, query]);

  const groupsCount = data?.length ?? 0;

  const showSkeleton = isLoading;
  const showError = isError;
  const showEmpty = !isLoading && !isError && groupsCount === 0 && !query;
  const showNoResults = !isLoading && !isError && groupsCount > 0 && filtered.length === 0;
  const showTable = !isLoading && !isError && filtered.length > 0;

  return (
    <section className="flex flex-col gap-4">
      {showSkeleton && <GroupsTableSkeleton />}

      {showTable && <GroupsTable groups={filtered} />}

      {showError && (
        <EmptyStateCard
          surface="canvas"
          title={t('groups.list.error')}
          description={t('groups.list.errorDesc')}
        />
      )}

      {showEmpty && (
        <EmptyStateV2
          icon={<Users strokeWidth={1.4} />}
          title={t('groups.list.empty')}
          description={t('groups.list.emptyDesc')}
          steps={[
            { title: t('groups.list.emptyStep1Title'), desc: t('groups.list.emptyStep1Desc') },
            { title: t('groups.list.emptyStep2Title'), desc: t('groups.list.emptyStep2Desc') },
            { title: t('groups.list.emptyStep3Title'), desc: t('groups.list.emptyStep3Desc') },
          ]}
          primaryAction={
            <CreateGroupModal
              triggerProps={{
                variant: 'default',
                size: 'lg',
                className:
                  'h-11 w-full rounded-2xl px-6 text-[15px] font-semibold shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:h-12 sm:w-56',
              }}
            />
          }
          pinTopLeft="9-Б"
          pinBottomRight="3 ученика"
        />
      )}

      {showNoResults && (
        <EmptyStateCard
          surface="canvas"
          title={t('groups.list.noResults')}
          description={t('groups.list.noResultsDesc')}
        />
      )}
    </section>
  );
}
