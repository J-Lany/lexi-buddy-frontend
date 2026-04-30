'use client';

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
    <div className={cn(shouldScroll && 'max-h-96 overflow-y-auto ui-scroll')}>
      {/* Desktop: table */}
      <div className="hidden sm:block">
        {/* Header */}
        <div className="flex items-center gap-4 px-3 pb-2 border-b border-(--border-soft)">
          <div className="flex-1 min-w-0">
            <span className="ui-stat font-medium">Student</span>
          </div>
          <div className="w-48 shrink-0">
            <span className="ui-stat font-medium">Progress</span>
          </div>
          <div className="w-28 shrink-0">
            <span className="ui-stat font-medium">Status</span>
          </div>
          <div className="w-4 shrink-0" />
        </div>

        {/* Rows */}
        {students.map((s) => {
          const cfg = getStatusConfig(s.status);
          const displayName =
            [s.firstName, s.lastName].filter(Boolean).join(' ').trim() ||
            s.username ||
            `Student #${s.id}`;

          return (
            <Link
              key={s.id}
              href={`${routes.students}/${s.id}`}
              className="flex items-center gap-4 px-3 py-3 rounded-xl transition-colors hover:bg-[color:var(--surface)] group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <StudentAvatar
                  username={s.username ?? displayName}
                  avatarUrl={s.avatarUrl ?? null}
                  size={32}
                />
                <span className="ui-title truncate">{displayName}</span>
              </div>

              <div className="w-48 shrink-0 flex items-center gap-2">
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'color-mix(in oklch, var(--primary) 12%, white 88%)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${s.progressPercent}%`,
                      background:
                        s.progressPercent === 0
                          ? 'transparent'
                          : 'color-mix(in oklch, var(--primary) 75%, white 25%)',
                    }}
                  />
                </div>
                <span className="ui-stat tabular-nums shrink-0 text-muted-foreground w-14 text-right">
                  {s.completedAssignments}/{s.totalAssignments}
                </span>
              </div>

              <div className="w-28 shrink-0">
                <span className={cn('ui-pill whitespace-nowrap', cfg.className)}>{cfg.label}</span>
              </div>

              <div className="w-4 shrink-0">
                <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-muted-foreground/70 transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: cards */}
      <div className="grid grid-cols-1 gap-2 sm:hidden">
        {students.map((s) => {
          const cfg = getStatusConfig(s.status);
          const displayName =
            [s.firstName, s.lastName].filter(Boolean).join(' ').trim() ||
            s.username ||
            `Student #${s.id}`;

          return (
            <Link
              key={s.id}
              href={`${routes.students}/${s.id}`}
              className="ui-card ui-radius-card flex items-center gap-3 px-4 py-3 w-full text-left"
            >
              <StudentAvatar
                username={s.username ?? displayName}
                avatarUrl={s.avatarUrl ?? null}
                size={36}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="ui-title truncate">{displayName}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn('ui-pill', cfg.className)}>{cfg.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="ui-stat">{s.progressPercent}%</span>
                  <span className="ui-stat text-muted-foreground/50">·</span>
                  <span className="ui-stat">
                    {s.completedAssignments}/{s.totalAssignments} done
                  </span>
                  {s.lastVisit && (
                    <>
                      <span className="ui-stat text-muted-foreground/50">·</span>
                      <span className="ui-stat text-muted-foreground/60">
                        {formatLastSeen(s.lastVisit)}
                      </span>
                    </>
                  )}
                </div>
                <ProgressLine value={s.progressPercent} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
