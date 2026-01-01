import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';
import { getStatusConfig } from '@/features/lessons/lesson-details/utils/get-status-config';
import { SectionLabel } from '@/features/lessons/lesson-details/components/lesson-assignees/components/section-label';

type StudentsSectionProps = {
  students: LessonDetails['students'];
};

export function StudentsSection({ students }: StudentsSectionProps) {
  if (students.length === 0) {
    return (
      <section className="space-y-2">
        <SectionLabel>Students</SectionLabel>
        <p className="text-xs text-muted-foreground">No students</p>
      </section>
    );
  }

  return (
    <section className="space-y-2">
      <SectionLabel>Students</SectionLabel>

      <div className="grid gap-3 sm:grid-cols-3 max-h-56 overflow-y-auto pr-1">
        {students.map((s) => {
          const cfg = getStatusConfig(s.status);

          return (
            <div
              key={s.id}
              className="
                flex items-center justify-between gap-2
                rounded-full border border-sky-100 bg-white
                px-3 py-1.5
              "
            >
              <div className="min-w-0">
                <div className="truncate text-xs font-medium sm:text-sm">
                  {s.username ?? `Student #${s.id}`}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {s.progressPercent}% done · {s.completedAssignments}/{s.totalAssignments}{' '}
                  assignments
                </div>
              </div>

              <span
                className={`
                  rounded-full border px-2 py-0.5 text-[10px] font-semibold
                  ${cfg.className}
                `}
              >
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
