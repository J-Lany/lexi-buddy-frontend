import type { TableHeaderColumn } from '@/shared/ui/table-header';

export const GROUPS_TABLE_COLS = 'grid-cols-[2fr_140px_140px]' as const;

export const GROUPS_TABLE_COLUMNS: TableHeaderColumn[] = [
  { label: 'Group', labelKey: 'table.columns.group' },
  { label: 'Level', labelKey: 'table.columns.level' },
  { label: 'Students', labelKey: 'table.columns.students', align: 'right' },
];
