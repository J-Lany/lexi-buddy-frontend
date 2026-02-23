import { TableHeaderColumn } from '@/shared/ui/table-header';

export const STUDENTS_TABLE_COLS = 'grid-cols-[2fr_1.5fr_1.5fr_92px]' as const;

export const STUDENTS_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: 'Name' },
  { label: 'Telegram' },
  { label: 'Group' },
  { label: 'Level', align: 'right' },
];
