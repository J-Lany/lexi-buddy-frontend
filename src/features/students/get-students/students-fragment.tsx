import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StudentTable } from '@/features/students/get-students/components/student-table';
import { useGetStudents } from '@/features/students/hooks/use-get-students';
import { CreateGroupModal } from '@/features/students/create-group/create-group-modal';
import { InviteStudentModal } from '@/features/students/add-student/add-student-modal';

export function StudentsFragment() {
  const { isError, isLoading, data, error } = useGetStudents();

  return (
    <section className="flex flex-col gap-4">
      <InviteStudentModal />
      <Input placeholder="search" className="w-full md:w-[384px]" />
      {data && <StudentTable students={data} />}
    </section>
  );
}
