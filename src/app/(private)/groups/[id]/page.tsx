import { Suspense } from 'react';
import GroupDetailsPage from '@/features/groups/group-details/group-details-page';

export default async function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={null}>
      <GroupDetailsPage groupId={id} />
    </Suspense>
  );
}
