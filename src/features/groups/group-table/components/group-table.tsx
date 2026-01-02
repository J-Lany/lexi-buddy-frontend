import { Group, GroupRow } from './group-row';

export function GroupTable({ groups }: { groups: Group[] }) {
  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
      {groups.map((group) => (
        <GroupRow key={group.id} group={group} />
      ))}
    </div>
  );
}
