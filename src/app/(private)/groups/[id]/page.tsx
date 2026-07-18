import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getGroupDashboard } from '@/entities/groups/api/get-group-dashboard';
import GroupDetailsWidget from '@/features/groups/widgets/group-details/group-details-widget';
import { groupsKeys } from '@/shared/query';

export default async function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const groupId = Number(id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: groupsKeys.dashboard(groupId),
    queryFn: () => getGroupDashboard(groupId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupDetailsWidget groupId={groupId} />
    </HydrationBoundary>
  );
}
