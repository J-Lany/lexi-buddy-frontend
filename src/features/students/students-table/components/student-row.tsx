import Link from 'next/link';

export type Student = {
  id: string;
  name: string;
  username: string;
  groupName: string;
  level: string;
};

export function StudentRow({ student }: { student: Student }) {
  return (
    <Link
      href={`/students/${student.id}`}
      className="
        flex items-center justify-between
        py-3 px-4
        bg-white shadow-sm rounded-full
        hover:bg-muted cursor-pointer
        sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6
      "
    >
      <div className="flex flex-col w-1/2 min-w-0 sm:contents">
        <span className="font-semibold text-gray-800 truncate">{student.name}</span>
        <span className="text-blue-500 text-sm truncate">@{student.username}</span>
      </div>

      <div className="flex flex-col items-end w-1/2 min-w-0 sm:contents">
        <span className="text-gray-600 truncate">{student.groupName}</span>
        <span className="text-gray-600 truncate">{student.level}</span>
      </div>
    </Link>
  );
}
