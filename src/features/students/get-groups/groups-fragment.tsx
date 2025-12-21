import { Input } from '@/components/ui/input';
import { useGetGroups } from '@/features/students/hooks/use-get-groups';
import { GroupTable } from '@/features/students/get-groups/components/group-table';
import { CreateGroupModal } from '@/features/students/create-group/create-group-modal';

export function GroupsFragment() {
  const { isError, isLoading, data, error } = useGetGroups();

  return (
    <section className="flex flex-col gap-4">
      <CreateGroupModal />
      <Input placeholder="search" className="w-full md:w-[384px]" />
      {data && <GroupTable groups={data} />}
    </section>
  );
}
