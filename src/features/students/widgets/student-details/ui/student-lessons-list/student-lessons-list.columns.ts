'use client';

import type { TableHeaderColumn } from '@/shared/ui/table-header';

export const STUDENT_LESSONS_TABLE_COLS = 'grid-cols-[2fr_1.5fr_120px_100px]' as const;

export const STUDENT_LESSONS_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: 'Lesson', labelKey: 'table.columns.lesson' },
  { label: 'Topic', labelKey: 'table.columns.topic' },
  { label: 'Level', labelKey: 'table.columns.level', align: 'right' },
  { label: 'Done', labelKey: 'table.columns.done', align: 'right' },
];
