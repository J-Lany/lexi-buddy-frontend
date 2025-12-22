import { Input } from '@/components/ui/input';
import { useGetGroups } from '@/features/groups/hooks/use-get-groups';
import { GroupTable } from '@/features/groups/group-table/components/group-table';
import { CreateGroupModal } from '@/features/groups/create-group-modal/create-group-modal';

export function GroupsFragment() {
  const { data } = useGetGroups();

  return (
    <section className="flex flex-col gap-4">
      <CreateGroupModal />
      <Input placeholder="search" className="w-full md:w-[384px]" />
      {data && <GroupTable groups={data} />}
    </section>
  );
}
