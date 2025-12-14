import { Student } from '@/features/students/student-row';

export type Group = {
  id: number;
  name: string;
  students: Student[];
};
export function GroupRow({ group }: { group: Group }) {
  return (
    <div className="flex flex-col items-start sm:flex-row py-3 px-10 bg-white shadow-sm rounded-full hover:bg-muted cursor-pointer border-b sm:gap-4 sm:px-6">
      <div className="font-semibold text-gray-800">{group.name}</div>
      <div className="text-gray-600">{group.students.length} students</div>
    </div>
  );
}
