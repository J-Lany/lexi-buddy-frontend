import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { getStatusConfig } from '@/features/lessons/lesson-details/utils/get-status-config';
import { cn, formatLastSeen } from '@/lib/utils';
import { ChevronRight, User } from 'lucide-react';
import { ProgressLine } from '@/features/lessons/lesson-details/components/lesson-assignees/components/progress-line';
import { StudentAvatar } from '@/features/students/students-table/components/student-avatar';
import { EAppRoutes } from '@/lib/routes';
import Link from 'next/link';

type StudentsSectionProps = {
  students: LessonDetails['students'];
};
export function StudentsSection({ students }: StudentsSectionProps) {
  if (students.length === 0) return <p className="ui-meta">No students</p>;

  const shouldScroll = students.length > 8;

  return (
    <div
      className={cn(
        'grid gap-3 lg:grid-cols-2',
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
            className="ui-row w-full rounded-3xl px-4 py-3 text-left transition-colors"
            href={`${EAppRoutes.STUDENTS}/${s.id}`}
          >
            <div className="flex items-start gap-3">
              <StudentAvatar
                username={s.username ?? displayName}
                avatarUrl={s.avatarUrl ?? null}
                FallbackIcon={User}
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
