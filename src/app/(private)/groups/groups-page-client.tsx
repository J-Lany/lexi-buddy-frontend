'use client';

import { useMyGroupsQuery } from '@/entities/groups/model/query/get-my-groups';
import { CreateGroupModal } from '@/features/groups/modals/create-group/create-group-modal';
import { GroupsListWidget } from '@/features/groups/widgets/groups-list/groups-list-widget';
import { useClearStaleQuery } from '@/shared/hooks/use-clear-stale-query';
import { useMergedQuery } from '@/shared/hooks/use-merged-query';
import { useI18n } from '@/shared/i18n';
import { Input } from '@/shared/ui/input';

const queryKeys = {
  q: 'q',
} as const;

export default function GroupsPageClient() {
  const { t } = useI18n();
  const { getOr, navigateWith } = useMergedQuery();
  const query = getOr(queryKeys.q, '');

  const { data, isPending, isError } = useMyGroupsQuery();
  const groupsCount = data?.length ?? 0;
  const groupsEmpty = !isPending && !isError && groupsCount === 0;

  useClearStaleQuery({
    queryKey: queryKeys.q,
    query,
    sourceCount: groupsCount,
    isLoading: isPending,
    isError,
    navigateWith,
  });

  return (
    <main>
      <section className="max-w-5xl flex flex-col gap-6">
        <div className="ui-panel ui-radius-card p-4 sm:p-5" data-testid="entity-list-toolbar">
          <div className="flex flex-wrap items-stretch sm:items-center gap-3 min-w-0">
            <Input
              value={query}
              onChange={(e) => navigateWith({ [queryKeys.q]: e.target.value })}
              placeholder={t('groups.page.searchGroups')}
              className="w-full sm:flex-1 sm:min-w-[260px] sm:w-auto"
            />
            {!groupsEmpty && (
              <div className="w-full sm:w-auto shrink-0">
                <CreateGroupModal />
              </div>
            )}
          </div>
        </div>

        <GroupsListWidget query={query} />
      </section>
    </main>
  );
}
