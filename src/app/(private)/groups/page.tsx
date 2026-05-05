import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

import GroupsPageClient from '@/app/(private)/groups/groups-page-client';
import { getMyGroups } from '@/entities/groups/api/get-my-groups';
import { groupsKeys } from '@/shared/query';

export default async function GroupsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: groupsKeys.myList(),
    queryFn: getMyGroups,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={null}>
        <GroupsPageClient />
      </Suspense>
    </HydrationBoundary>
  );
}
