import type { StudentDashboardDto } from '@/entities/students/api/get-student-dashboard';

type Group = StudentDashboardDto['groups'][number];

type Props = {
  groups: readonly Group[];
};

export function GroupsSection({ groups }: Props) {
  if (!groups.length) return null;

  return (
    <div className="mt-6">
      <div className="ui-meta mb-2 px-1">Groups</div>

      <div className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <span
            key={g.id}
            className="ui-pill !h-7 !px-3 max-w-full truncate opacity-85"
            title={g.name}
          >
            {g.name}
            {g.level ? ` · ${g.level}` : ''}
          </span>
        ))}
      </div>
    </div>
  );
}
