import GroupDetailsPage from '@/features/groups/group-details/group-details-page';

export default function GroupPage({ params }: { params: { id: string } }) {
  return <GroupDetailsPage groupId={params.id} />;
}
