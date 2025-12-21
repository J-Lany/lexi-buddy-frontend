import { Input } from '@/components/ui/input';
import { useGetStudents } from '@/features/students/hooks/use-get-students';
import { InviteStudentModal } from '@/features/students/add-student-modal/add-student-modal';
import { StudentTable } from '@/features/students/students-table/components/student-table';

export function StudentsFragment() {
  const { data } = useGetStudents();

  return (
    <section className="flex flex-col gap-4">
      <InviteStudentModal />
      <Input placeholder="search" className="w-full md:w-[384px]" />
      {data && <StudentTable students={data} />}
    </section>
  );
}
