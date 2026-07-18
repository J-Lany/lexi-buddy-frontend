import type { LessonDashboardDto } from '@/entities/lessons/api/get-lesson-dashboard';

type Student = LessonDashboardDto['students'][number];

export function getStatusConfig(status: Student['status']) {
  switch (status) {
    case 'COMPLETED':
      return {
        label: 'Completed',
        className:
          'bg-[var(--success-soft)] text-[var(--success)] border-[color-mix(in_oklch,var(--success)_25%,white_75%)]',
      };
    case 'PENDING':
      // amber kept intentionally — no --warning token yet
      return {
        label: 'In progress',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    case 'NOT_STARTED':
    default:
      return {
        label: 'Not started',
        className: 'bg-[var(--muted)] text-muted-foreground border-[var(--border-soft)]',
      };
  }
}
