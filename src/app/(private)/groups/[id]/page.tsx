import { Suspense } from 'react';

import GroupDetailsWidget from '@/features/groups/widgets/group-details/group-details-widget';

export default async function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={null}>
      <GroupDetailsWidget groupId={Number(id)} />
    </Suspense>
  );
}
