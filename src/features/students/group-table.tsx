import { Group, GroupRow } from '@/features/students/group-row';

export function GroupTable({ groups }: { groups: Group[] }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="hidden sm:grid grid-cols-4 py-1 px-6 font-semibold bg-table-header rounded-full">
        <span>Name</span>
        <span>Students count</span>
      </div>
      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <GroupRow group={group} key={group.id} />
        ))}
      </div>
    </div>
  );
}
