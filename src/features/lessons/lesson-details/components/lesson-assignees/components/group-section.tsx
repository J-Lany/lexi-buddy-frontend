import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import Link from 'next/link';
import { EAppRoutes } from '@/lib/routes';

type GroupsSectionProps = {
  groups: LessonDetails['groups'];
};

export function GroupsSection({ groups }: GroupsSectionProps) {
  if (!groups || groups.length === 0) return <span className="ui-meta">No groups</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {groups.map((g) => (
        <Link
          key={g.id}
          href={`${EAppRoutes.GROUPS}/${g.id}`}
          className="ui-pill max-w-full truncate"
        >
          {g.name}
        </Link>
      ))}
    </div>
  );
}
