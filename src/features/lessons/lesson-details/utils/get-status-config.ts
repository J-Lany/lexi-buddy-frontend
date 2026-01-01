import { LessonDetails } from '@/features/lessons/create-lesson-modal/types';

type Student = LessonDetails['students'][number];

export function getStatusConfig(status: Student['status']) {
  switch (status) {
    case 'COMPLETED':
      return {
        label: 'Completed',
        className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    case 'PENDING':
      return {
        label: 'In progress',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    case 'NOT_STARTED':
    default:
      return {
        label: 'Not started',
        className: 'bg-slate-50 text-slate-600 border-slate-200',
      };
  }
}
