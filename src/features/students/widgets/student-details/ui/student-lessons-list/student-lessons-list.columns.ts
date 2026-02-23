'use client';

import type { TableHeaderColumn } from '@/shared/ui/table-header';

export const STUDENT_LESSONS_TABLE_COLS = 'grid-cols-[2fr_1.5fr_120px_100px]' as const;

export const STUDENT_LESSONS_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: 'Lesson' },
  { label: 'Topic' },
  { label: 'Level', align: 'right' },
  { label: 'Done', align: 'right' },
];
