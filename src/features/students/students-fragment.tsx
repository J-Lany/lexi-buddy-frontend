import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StudentTable } from '@/features/students/student-table';

export function StudentsFragment() {
  return (
    <section className="flex flex-col gap-4">
      <Button className="rounded-full w-48" variant="outline">
        + Add student
      </Button>
      <Input placeholder="search" className="w-[384px]" />
      <StudentTable />
    </section>
  );
}
