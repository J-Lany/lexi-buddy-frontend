import { Student, StudentRow } from '@/features/students/get-students/components/student-row';

export function StudentTable({ students }: { students: Student[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="hidden sm:grid grid-cols-4 py-1 px-6 font-semibold rounded-full bg-table-header rounded-full">
        <span>Name</span>
        <span>Telegram</span>
        <span>Group</span>
        <span>Level</span>
      </div>
      <div className="flex flex-col gap-4">
        {students.map((student) => (
          <StudentRow key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}
