import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetGroups } from '@/features/students/hooks/use-get-groups';
import { GroupTable } from '@/features/students/group-table';

export function GroupsFragment() {
  const { isError, isLoading, data, error } = useGetGroups();

  return (
    <section className="flex flex-col gap-4">
      <Button className="rounded-full w-48" variant="outline">
        + Create group
      </Button>
      <Input placeholder="search" className="w-full md:w-[384px]" />
      {data && <GroupTable groups={data} />}
    </section>
  );
}
