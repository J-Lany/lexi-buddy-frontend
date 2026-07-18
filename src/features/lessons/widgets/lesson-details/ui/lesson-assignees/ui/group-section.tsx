import Link from 'next/link';

import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { routes } from '@/shared/router/routes';

type GroupsSectionProps = {
  groups: LessonDashboardDto['groups'];
};

export function GroupsSection({ groups }: GroupsSectionProps) {
  if (!groups || groups.length === 0) return <span className="ui-meta">No groups</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {groups.map((g) => (
        <Link key={g.id} href={`${routes.groups}/${g.id}`} className="ui-pill max-w-full truncate">
          {g.name}
        </Link>
      ))}
    </div>
  );
}
