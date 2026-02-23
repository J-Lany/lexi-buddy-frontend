import type { TableHeaderColumn } from '@/shared/ui/table-header';

export const GROUP_STUDENTS_TABLE_COLS = 'grid-cols-[2fr_1.5fr_92px_44px]' as const;

export const GROUP_STUDENTS_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: 'Name' },
  { label: 'Telegram' },
  { label: 'Level', align: 'right' },
  { label: 'Actions', align: 'right' },
];
