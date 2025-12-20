import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StudentTable } from '@/features/students/student-table';
import { useGetStudents } from '@/features/students/hooks/use-get-students';
import { CreateGroupModal } from '@/features/students/create-group/create-group-modal';

export function StudentsFragment() {
  const { isError, isLoading, data, error } = useGetStudents();

  return (
    <section className="flex flex-col gap-4">
      <Button className="rounded-full w-48" variant="outline">
        + Add student
      </Button>
      <Input placeholder="search" className="w-full md:w-[384px]" />
      {data && <StudentTable students={data} />}
    </section>
  );
}
