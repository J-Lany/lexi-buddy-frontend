import type { TableHeaderColumn } from '@/shared/ui/table-header';

export const GROUP_STUDENTS_TABLE_COLS = 'grid-cols-[2fr_1.5fr_92px_44px]' as const;

export const GROUP_STUDENTS_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: 'Name', labelKey: 'table.columns.name' },
  { label: 'Telegram', labelKey: 'table.columns.telegram' },
  { label: 'Level', labelKey: 'table.columns.level', align: 'right' },
  { label: 'Actions', labelKey: 'table.columns.actions', align: 'right' },
];
