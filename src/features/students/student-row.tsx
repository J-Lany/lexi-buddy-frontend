type Student = {
  id: string;
  name: string;
  telegram: string;
  group: string;
  level: string;
};
export function StudentRow({ student }: { student: Student }) {
  return (
    <div className="grid grid-cols-4 py-3 px-6 rounded-full bg-white shadow-sm hover:bg-muted cursor-pointer">
      <span>{student.name}</span>
      <span>@{student.telegram}</span>
      <span>{student.group}</span>
      <span>{student.level}</span>
    </div>
  );
}
