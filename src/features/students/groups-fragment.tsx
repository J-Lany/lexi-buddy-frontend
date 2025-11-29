import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function GroupsFragment() {
  return (
    <section className="flex flex-col gap-4">
      <Button className="rounded-full w-48" variant="outline">
        + Create group
      </Button>
      <Input placeholder="search" className="w-[384px]" />
      <div>List</div>
    </section>
  );
}
