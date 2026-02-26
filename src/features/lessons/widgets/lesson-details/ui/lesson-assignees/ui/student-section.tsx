import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';
import { getStatusConfig } from '@/features/lessons/widgets/lesson-details/lib/get-status-config';
import { ProgressLine } from '@/features/lessons/widgets/lesson-details/ui/lesson-assignees/ui/progress-line';
import { cn } from '@/shared/lib/cn';
import { formatLastSeen } from '@/shared/lib/format/format-last-seen';
import { routes } from '@/shared/router/routes';
import { StudentAvatar } from '@/shared/ui/student-avatar';

type StudentsSectionProps = {
  students: LessonDashboardDto['students'];
};
export function StudentsSection({ students }: StudentsSectionProps) {
  if (students.length === 0) return <p className="ui-meta">No students</p>;

  const shouldScroll = students.length > 8;

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-3 lg:grid-cols-2 w-full',
        shouldScroll && 'max-h-96 overflow-y-auto pr-1 ui-scroll',
      )}
    >
      {students.map((s) => {
        const cfg = getStatusConfig(s.status);

        const displayName =
          [s.firstName, s.lastName].filter(Boolean).join(' ').trim() ||
          s.username ||
          `Student #${s.id}`;

        return (
          <Link
            key={s.id}
            type="button"
            className="ui-row w-full min-w-0 rounded-3xl px-4 py-3 text-left transition-colors"
            href={`${routes.students}/${s.id}`}
          >
            <div className="flex items-start gap-3">
              <StudentAvatar
                username={s.username ?? displayName}
                avatarUrl={s.avatarUrl ?? null}
                size={40}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="ui-title">{displayName}</div>
                    <div className="ui-meta">
                      {s.progressPercent}% · {s.completedAssignments}/{s.totalAssignments} · last
                      seen {s.lastVisit ? formatLastSeen(s.lastVisit) : '—'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={cn('ui-pill shrink-0', cfg.className)}>{cfg.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <ProgressLine value={s.progressPercent} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
