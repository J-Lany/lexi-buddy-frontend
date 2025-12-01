type Student = {
  id: string;
  name: string;
  telegram: string;
  group: string;
  level: string;
};
export function StudentRow({ student }: { student: Student }) {
  return (
    <div className="flex justify-between items-center py-3 px-10 bg-white shadow-sm rounded-full hover:bg-muted cursor-pointer border-b sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
      <div className="flex flex-col sm:contents">
        <span className="font-semibold text-gray-800">{student.name}</span>
        <span className="text-blue-500 text-sm">@{student.telegram}</span>
      </div>
      <div className="flex flex-col items-end sm:contents">
        <span className="text-gray-600">{student.group}</span>
        <span className="text-gray-600">{student.level}</span>
      </div>
    </div>
  );
}
